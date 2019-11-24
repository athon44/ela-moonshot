const textToSpeech = require("@google-cloud/text-to-speech");
const fs = require("fs");
const util = require("util");
const player = require('play-sound')(opts = {});

module.exports = {
  async createFile(text) {
    if(text) {
      const client = new textToSpeech.TextToSpeechClient();
      const request = {
        input: { text },
        voice: { languageCode: "pt-BR", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" }
      };
      const [response] = await client.synthesizeSpeech(request);
      const writeFile = util.promisify(fs.writeFile);
      await writeFile("output.mp3", response.audioContent, "binary");
      console.log("Audio content written to file: output.mp3");
    }
 
    const audio = player.play('output.mp3', function(err) {
      if(err) console.log('nois');
    });

    audio.kill();
    
  }
};
