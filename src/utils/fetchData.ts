export const fetchData = async (url: string) => {
  let data;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
    });

    if (response?.ok) {
      return response.json();
    }
    if (response.status === 404) {
      return (data = { error: true, message: "Nada foi encontrado..." });
    }

    throw new Error("Desculpe, ocorreu um erro inesperado!");
  } catch (error: any) {
    if (error) {
      return (data = { error: true, message: error.message });
    }
  }
};
