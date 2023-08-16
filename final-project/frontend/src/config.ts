const BASE_URL = import.meta.env.VITE_BASE_URL;
if (!BASE_URL) {
    throw new Error("BASE_URL is undefined")
}

export {BASE_URL}

