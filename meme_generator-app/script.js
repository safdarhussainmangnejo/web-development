document.addEventListener("DOMContentLoaded", function () {
  var memeForm = document.getElementById("meme-form");
  var listGallery = document.querySelector(".gallery");
  let downloadBtn = document.querySelector("button");

  memeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // creating the li element

    var memeLi = document.createElement("li");
    memeLi.classList.add("meme-img");

    // creating the canvas element to put our img background
    var topText = document.getElementById("text-top");
    var urlInput = document.getElementById("uploaded-img").value,
      src = urlInput,
      img = document.createElement("img");
    img.src = src;
    img.width = "500";

    var topTextDiv = document.createElement("div");
    topTextDiv.classList.add("text", "top");
    topTextDiv.innerText = document.getElementById("text-top").value;

    var bottomTextDiv = document.createElement("div");
    bottomTextDiv.classList.add("text", "bottom");
    bottomTextDiv.innerText = document.getElementById("text-bottom").value;

    var removeDiv = document.createElement("div");
    removeDiv.classList.add("red-cross");
    removeDiv.innerText = "X";
    removeDiv.style.color = "red";

    listGallery.appendChild(memeLi);
    memeLi.appendChild(img);
    memeLi.appendChild(topTextDiv);
    memeLi.appendChild(bottomTextDiv);
    memeLi.appendChild(removeDiv);
    // memeLi.appendChild(removeButton);

    memeForm.reset();

    downloadBtn.addEventListener("click", (e) => {
      //   let img = urlInput;
      e.preventDefault();
      downloadBtn.innerText = "Downloading file...";
      console.log(urlInput);
      fetchFile(urlInput);
    });
  });

  function fetchFile(url) {
    fetch(url, {
      mode: "no-cors",
    })
      .then((res) => res.blob())
      .then((file) => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, "");
        document.body.appendChild(aTag);
        aTag.click();
        downloadBtn.innerText = "Download File";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
      })
      .catch(() => {
        alert("Failed to download file!");
        downloadBtn.innerText = "Download File";
      });
  }

  function remove(event) {
    event.target.parentNode.remove();
  }

  listGallery.addEventListener("click", remove, false);
});
