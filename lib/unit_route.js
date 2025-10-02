import getDayRange from "./get_day_range"; 

export  async function Get_unit_route(esn) {
  const { date_ini, date_fin } = getDayRange();
  try {
    const response = await fetch("https://gps.localizate.mx/General/ruta", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        esn,
        date_ini,
        date_fin,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    //console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error en Get_unit_route:", error);
    return null;
  }
}
export  async function Get_unit_stops(esn) {

  try {
    const response = await fetch("https://gps.localizate.mx/General/ruta", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        esn:esn,
        date_ini: 0,
        date_fin: 0,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    //console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error en Get_unit_route:", error);
    return null;
  }
}
