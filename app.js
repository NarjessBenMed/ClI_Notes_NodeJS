const fs = require("fs");

if (process.argv.length == 3) {
  if (process.argv[2].toUpperCase() === "LIST") {
    const data = fs.readFile("./note.json", "utf8", function(err, data) {
      const notes = JSON.parse(data);
      console.log("Printings " + notes.length + " note(s)");
      notes.map(el =>
        console.log("\n Title :" + el.title + "\n Body : " + el.body)
      );
    });
  } else {
    console.log("verify your commande");
  }
  
} else if (process.argv[3] != "--title" && process.argv.length > 3) {
  console.log("Missing  required arguement: --tiltle ");
} else if (!process.argv[4]) console.log("Missing  required title ");
else {
  switch (process.argv[2].toUpperCase()) {
    case "READ": {
      fs.readFile("./note.json", "utf8", function(err, data) {
        const note = JSON.parse(data);

        const speceficNote = note.filter(el => el.title == process.argv[4]);
        if (speceficNote.length > 0) {
          console.log("Note found ");
          console.log(
            "\n Title :" +
              speceficNote[0].title +
              "\n Body : " +
              speceficNote[0].body
          );
        } else console.log("Note not found");
      });
      break;
    }

    case "REMOVE": {
      fs.readFile("./note.json", "utf8", function(err, data) {
        const note = JSON.parse(data);
        const filtredNote = note.filter(el => el.title != process.argv[4]);
        console.log("Note was removed");
        filtredNote.map(el =>
          console.log("\n Title :" + el.title + "\n Body : " + el.body)
        );

        fs.writeFile("./note.json", JSON.stringify(filtredNote), err => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });

      break;
    }

    case "ADD":
      fs.readFile("./note.json", "utf8", function(err, data) {
        const note = JSON.parse(data);

        if (process.argv[5] != "--body" && process.argv.length > 3) {
          console.log("Missing  required arguement: --body ");
          if (!process.argv[6]) console.log("Missing  required body ");
          return;
        }
        note.push({ title: process.argv[4], body: process.argv[6] });

        note.map(el =>
          console.log("\n Title :" + el.title + "\n Body : " + el.body)
        );

        fs.writeFile("./note.json", JSON.stringify(note), err => {
          if (err) {
            console.error(err);
            return;
          }
        });
      });
      break;
  }
}
