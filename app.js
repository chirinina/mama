
        // Desactivar clic derecho
        document.addEventListener("contextmenu", function (e) {
          e.preventDefault();
        });

        // Desactivar combinaciones de teclas para inspeccionar
        document.addEventListener("keydown", function (e) {
          if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") ||
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") ||
            (e.ctrlKey && e.key.toLowerCase() === "u") ||
            (e.ctrlKey && e.key.toLowerCase() === "s")
          ) {
            e.preventDefault();
          }
        });

        document.addEventListener("DOMContentLoaded", function () {
          const nameForm = document.getElementById("name-form");
          const nameInput = document.getElementById("name-input");
          const submitBtn = document.getElementById("submit-btn");
          const momNameElement = document.getElementById("mom-name");
          const letterMomNameElement = document.getElementById("letter-mom-name");
          const childTypeElement = document.getElementById("child-type");
          const shareBtn = document.getElementById("share-btn");
          const envelope = document.getElementById("envelope");
          const childTypeRadios = document.querySelectorAll(
            'input[name="child-type"]'
          );

          const urlParams = new URLSearchParams(window.location.search);
          const nameParam = urlParams.get("nombre");
          const typeParam = urlParams.get("tipo");

          if (nameParam && typeParam) {
            updateNames(nameParam, typeParam);
            nameForm.style.display = "none";
            shareBtn.style.display = "block";
            document.querySelector(`input[value="${typeParam}"]`).checked = true;
          } else {
            nameForm.style.display = "flex";
            envelope.style.display = "none";
          }

          submitBtn.addEventListener("click", function () {
            const name = nameInput.value.trim();
            const childType = document.querySelector(
              'input[name="child-type"]:checked'
            ).value;

            if (name) {
              updateNames(name, childType);
              nameForm.style.display = "none";
              envelope.style.display = "block";
              shareBtn.style.display = "block";

              const newUrl = `${
                window.location.pathname
              }?nombre=${encodeURIComponent(name)}&tipo=${childType}`;
              window.history.pushState({}, "", newUrl);
            }
          });

          shareBtn.addEventListener("click", function () {
            const currentUrl = window.location.href;

            if (navigator.share) {
              navigator
                .share({
                  title: "Una carta especial para mamá",
                  text: "Mira esta linda carta que hice para mi Ti mi Reyna ❤️",
                  url: currentUrl,
                })
                .catch(() => copyToClipboard(currentUrl));
            } else {
              copyToClipboard(currentUrl);
            }
          });

          function updateNames(name, type) {
            momNameElement.textContent = name;
            letterMomNameElement.textContent = name;
            childTypeElement.textContent = `Tu ${type}`;
          }

          function copyToClipboard(text) {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            alert("¡Enlace copiado! Compártelo con amor ❤️");
          }
        });

    
        const toggleBtn = document.getElementById("toggle-btn");
        const moreOptions = document.getElementById("more-options");

        toggleBtn.addEventListener("click", () => {
          const isVisible = moreOptions.style.display === "block";
          moreOptions.style.display = isVisible ? "none" : "block";
          toggleBtn.textContent = isVisible ? "▼" : "▲";
          toggleBtn.title = isVisible ? "Mostrar más opciones" : "Ocultar opciones";
        });
        const icon = document.getElementById("showTooltip");
        const tooltip = document.getElementById("tooltipMessage");

        icon.addEventListener("click", () => {
          icon.classList.add("opening");
          setTimeout(() => {
            tooltip.classList.toggle("show");
            icon.classList.remove("opening");
          }, 600);
        });

        document.addEventListener("click", (e) => {
          if (!icon.contains(e.target) && !tooltip.contains(e.target)) {
            tooltip.classList.remove("show");
          }
        });

        icon.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            icon.click();
          }
        });
 
   