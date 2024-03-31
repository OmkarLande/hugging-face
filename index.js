import { HfInference } from '@huggingface/inference'

const hf = new HfInference(import.meta.env.VITE_HF_TOKEN)
const token = import.meta.env.VITE_HF_TOKEN

//---------------text to speech-----------------

// const text = "Wow, Omkar is absolutely unstoppable! His development skills are unmatched. I can't help but wish he could work his magic on me."

// const response = await hf.textToSpeech({
//   inputs: text,
//   model: "espnet/kan-bayashi_ljspeech_vits"
// })

// console.log(response)

// const audioElement = document.getElementById('speech')
// const speechUrl = URL.createObjectURL(response)
// audioElement.src = speechUrl

//---------------image transformation-----------------

// const model = "ghoskno/Color-Canny-Controlnet-model"

// const oldImageUrl = "/old-photo.jpeg"
// const oldImageResponse = await fetch(oldImageUrl)
// const oldImageBlob = await oldImageResponse.blob()

// const prompt = `An elderly couple walks together on a gravel path with green 
// grass and trees on each side. Wearing neutral-colored clothes, they face away
//  from the camera as they carry their bags.`

// const newImageBlob = await hf.imageToImage({
//   model: model,
//   inputs: oldImageBlob,
//   parameters: {
//     prompt: prompt,
//     negative_prompt: "Black and white photo. text, bad anatomy, blurry, low quality",
//     strength: 1.85,
//   }

// })

// const newImageBase64 = await blobToBase64(newImageBlob)
// const newImage = document.getElementById("new-image1")
// newImage.src = newImageBase64


// const myImageUrl = "/AI-Loves-me-1.png"
// const myImageResponse = await fetch(myImageUrl)
// const myImageBlob = await myImageResponse.blob()

// const newPrompt = `A cartoon character of person with extraordianry skills and creativity. The character is wearing a hoodie. The character is flying in the dream and has a creativity in his hand. The character is wearing a red and blue costume.`  

// const newImageBlob2 = await hf.imageToImage({
//   model: model,
//   inputs: myImageBlob,
//   parameters: {
//     prompt: newPrompt,
//     negative_prompt: "Black and white photo. text, bad anatomy, blurry, low quality",
//     strength: 1,
//   }
// })

// const newImageBase64_2 = await blobToBase64(newImageBlob2)
// const newImage_2 = document.getElementById("new-image2")
// newImage_2.src = newImageBase64_2


//---------------List of Hugging face hub free models-----------------

import { listModels } from "@huggingface/hub";

async function isModelInferenceEnabled(modelName) {
  const response = await fetch(`https://api-inference.huggingface.co/status/${modelName}`)
  const data = await response.json()
  return data.state == "Loadable"
}

const models = []

for await (const model of listModels({
  credentials: {
      accessToken: token
  },
  search: {
      task: "text-to-image"
  }
})) {
  if (model.likes < 2000) {
      continue
  } 
  
  if (await isModelInferenceEnabled(model.name)) {
      models.push(model)
  }
}
console.log(models.length + " models found")
console.log(models)

// Sort models by likes and return HF URL

models.sort((model1, model2) => model2.likes - model1.likes)
for (const model of models) {
  console.log(`${model.likes} Likes: https://huggingface.co/${model.name}`)
}
console.log(models.length + " models found")
console.log(models)