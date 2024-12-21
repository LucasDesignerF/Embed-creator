document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("embedModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const form = document.getElementById("embedForm");
    const emojiBtn = document.getElementById("emojiBtn");
    const emojiPicker = document.getElementById("emojiPicker");
    const embedTitleInput = document.getElementById("embedTitle");

    // Mostrar ou ocultar o seletor de emojis
    emojiBtn.addEventListener("click", () => {
        if (emojiPicker.classList.contains("hidden")) {
            emojiPicker.classList.remove("hidden");
            const rect = emojiBtn.getBoundingClientRect();
            emojiPicker.style.top = `${rect.bottom + window.scrollY}px`;
            emojiPicker.style.left = `${rect.left + window.scrollX}px`;
        } else {
            emojiPicker.classList.add("hidden");
        }
    });

    // Adicionar o emoji ao campo de título
    emojiPicker.addEventListener("click", (event) => {
        if (event.target.classList.contains("emoji")) {
            embedTitleInput.value += event.target.textContent;
            emojiPicker.classList.add("hidden");
        }
    });

    // Fechar o seletor de emojis ao clicar fora
    document.addEventListener("click", (event) => {
        if (!emojiPicker.contains(event.target) && event.target !== emojiBtn) {
            emojiPicker.classList.add("hidden");
        }
    });

    openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            username: "Embed Creator",
            embeds: [
                {
                    title: embedTitleInput.value,
                    description: document.getElementById("embedDescription").value,
                    color: parseInt(document.getElementById("embedColor").value.replace("#", ""), 16),
                    thumbnail: { url: document.getElementById("thumbnailUrl").value || undefined },
                    image: { url: document.getElementById("imageUrl").value || undefined },
                    footer: { text: document.getElementById("embedFooter").value || undefined },
                },
            ],
        };

        const webhookUrl = document.getElementById("webhookUrl").value;

        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Mensagem enviada com sucesso!");
                form.reset();
            } else {
                alert("Erro ao enviar a mensagem. Verifique o Webhook.");
            }
        } catch (error) {
            alert("Erro ao enviar a mensagem. Verifique o Webhook.");
        }
    });
});