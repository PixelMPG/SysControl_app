export default async function getUnidades(id) {
  try {
    const response = await fetch("https://gps.localizate.mx/General/unidades", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        id_empresa: id,
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
