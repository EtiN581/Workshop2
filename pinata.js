const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyNGVjYjU3OS0zNWZkLTQxZmYtYjk1Yy05ZjFiOWRiY2JiMTAiLCJlbWFpbCI6ImV0aWVubmUuZ291cnlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjczYTc5MGVmZGM0YTc2YzA4OGNhIiwic2NvcGVkS2V5U2VjcmV0IjoiZGE3NjQ5YTBiYjdiNTE2ZGMyYWQ5ZjI0OTg3Y2U2NDdiZTdiZjQ2MGYxNWZiNTJmNDUwOTBkMzk1ZmYyNWM2NiIsImlhdCI6MTcwNzc4MDYxN30.l6axfE8IHvWwLT7wjRv9D4ETf5cq9cW2nY3joNroZ4A'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "Chaton.jpeg";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const pinataMetadata = JSON.stringify({
      name: 'Chaton.jpeg',
    });
    formData.append('pinataMetadata', pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}

pinFileToIPFS()