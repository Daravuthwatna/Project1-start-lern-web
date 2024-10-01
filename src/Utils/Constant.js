export const getImageUrl = (image) => {
  return `https://piseth.site/api/get-image/${image}`;
}

export const getImageLocalHost = (image) => {
  return `http://localhost:8000/api/getImage/${image}`;
}


export const getGender = {
  1: "Male",
  0: "Female",
}

export const getStatus = {
  1:"Active",
  0:"Inactive"
}