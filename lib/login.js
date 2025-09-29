export default async function doLogin (username, pass){

    try {
    const response = await fetch("https://gps.localizate.mx/General/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      //credentials: 'include',
      body: new URLSearchParams({
        usuario: username,
        pass: pass
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getUnidades:", error);
    return null;
  }
}