const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;
  console.log(prompt, size);
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const imageURL = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageURL,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

const variationImage = async (req, res) => {
  const { image, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
  try {
    const response = await openai.createImageVariation(
      fs.createReadStream(`uploads/${image}`),
      1,
      imageSize
    );
    const imageURL = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageURL,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: "The image could not be generated",
    });
  }
};

const editImage = async (req, res) => {
  const { image, mask, prompt, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImageEdit(
      fs.createReadStream(`uploads/${image}`),
      fs.createReadStream(`uploads/${mask}`),
      prompt,
      1,
      imageSize
    );
    imageUrl = response.data.data[0].url;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      error: "The image could not be edited",
    });
  }
};

module.exports = { generateImage, variationImage, editImage };
