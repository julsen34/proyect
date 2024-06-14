// registro.js

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('http://localhost:3000/proyect/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        alert(result.message);

        if (response.ok) {
            window.location.href = 'inicio.html'; // Redireccionar a la página de inicio de sesión si el registro es exitoso
        }
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.');
    }
});
