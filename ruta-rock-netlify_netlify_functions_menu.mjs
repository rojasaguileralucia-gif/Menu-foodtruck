import { getStore } from "@netlify/blobs";

const DEFAULT_MENU = {
  "wa": "+56981547457",
  "note": "Consulta por ingredientes y alérgenos. Precios en pesos chilenos, IVA incluido.",
  "sections": [
    {
      "id": "ciabattas",
      "title": "Ciabattas",
      "sub": "Pan crocante, sabor a todo volumen.",
      "th": "cb",
      "ic": "ic3",
      "ph": "phbasket",
      "items": [
        {
          "n": "Red Hot Chili Ciabatta",
          "d": "Mechada casera tan tierna que no necesita teloneros, con queso chango fundido, pebre picante y mayonesa casera. Para los que viven al límite.",
          "p": "$13.500",
          "t": "Picante"
        },
        {
          "n": "The Rolling Pork",
          "d": "Cerdo desmenuzado, cebolla caramelizada y salsa barbecue sobre ciabatta. Una gira completa de sabor.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Highway to Cheese",
          "d": "Ave mayo con especias, extra queso fundido, tomate y orégano. Camino directo al queso, sin frenos.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Hendrix",
          "d": "Churrasco de lomo picado a la plancha, con tomate fresco, palta y mayonesa de la casa. Un solo legendario, sin distorsión.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Axl Rose",
          "d": "Pechuga de pollo marinada con hierbas, lechuga, queso fundido, salsa tártara y aceitunas. Salvaje por fuera, jugosa por dentro.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "El Cerati",
          "d": "Mozzarella, tomate cherry, pimentón asado, champiñones y rúcula. Suave, profundo y para siempre.",
          "p": "$0.000",
          "t": "Vegetariana"
        }
      ]
    },
    {
      "id": "hamburguesas",
      "title": "Hamburguesas",
      "sub": "Armadas a fuego, servidas a todo volumen.",
      "th": "bk",
      "ic": "ic3",
      "ph": "phburger",
      "items": [
        {
          "n": "The Queen",
          "d": "Pan de papa, hamburguesa casera, huevo frito, tocino, queso cheddar, palta y mayonesa casera de ajo. La reina del escenario, coronada con huevo.",
          "p": "$0.000",
          "t": "Favorita"
        },
        {
          "n": "Smells Like Teen Burger",
          "d": "Pan de papa, hamburguesa smash casera, lechuga, champiñones y salsa de la casa. Actitud grunge, sabor sin filtro.",
          "p": "$0.000",
          "t": ""
        }
      ]
    },
    {
      "id": "papas",
      "title": "Papas fritas",
      "sub": "El acompañamiento que se roba el show.",
      "th": "cn",
      "ic": "ic5",
      "ph": "phfries",
      "items": [
        {
          "n": "Papas Nirvana",
          "d": "Papas fritas holandesas con mayonesa casera de ajo asado y toques de cilantro. Suenan suaves, pegan fuerte.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Papas Zeppelin",
          "d": "Cono de papas fritas holandesas con salsa de cheddar y trozos de cocina. Pesado, épico, imposible de soltar.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "The Dark Side of the Fries",
          "d": "Papas fritas holandesas bañadas en salsa barbecue y cebolla crujiente. El lado oscuro del crujido.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Solo Fries",
          "d": "Papas fritas crujientes con sal de mar y salsa a elección. Simple, directo y sin teloneros.",
          "p": "$0.000",
          "t": ""
        }
      ]
    },
    {
      "id": "bebidas",
      "title": "Bebidas",
      "sub": "Refréscate entre solo y solo.",
      "th": "bl",
      "ic": "ic1",
      "ph": "phdrink",
      "items": [
        {
          "n": "Pink Floyd Lemonade",
          "d": "Limonada casera con toque de frambuesa. Rosa, fresca y muy psicodélica.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Sweet Child o’ Lime",
          "d": "Mojito sin alcohol: menta, limón, hielo y bebida Sprite o similar. Dulce, cítrico y adictivo.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "The Dark Side of Lemonade",
          "d": "Limonada casera, azúcar y pulpa de arándano o mora. Lo oscuro también refresca.",
          "p": "$0.000",
          "t": ""
        },
        {
          "n": "Maracuyá Amp",
          "d": "Red Bull o similar, hielo, pulpa de maracuyá y toques de menta. Sube el volumen al máximo.",
          "p": "$0.000",
          "t": "Energía"
        }
      ]
    },
    {
      "id": "otros",
      "title": "Otros",
      "sub": "Para compartir (o no).",
      "th": "cb",
      "ic": "ic11",
      "ph": "phshare",
      "items": [
        {
          "n": "Nachos Fleetwood Mac",
          "d": "Nachos con queso cheddar, guacamole y crema ácida, con toques de cilantro. Para compartir… o para pelearse por el último.",
          "p": "$0.000",
          "t": "Para compartir"
        },
        {
          "n": "Bohemian Cake",
          "d": "Porción de queque tradicional. Receta de siempre, sabor de rapsodia.",
          "p": "$0.000",
          "t": ""
        }
      ]
    }
  ]
};

export default async (req, context) => {
  const expectedPassword = Netlify.env.get("ADMIN_PASSWORD") || "rutarock2026";
  const providedPassword = req.headers.get("x-admin-password") || "";

  const url = new URL(req.url);
  if (url.searchParams.get("verify") === "1") {
    if (providedPassword !== expectedPassword) {
      return new Response(JSON.stringify({ error: "No autorizado" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  }

  const store = getStore("ruta-rock-store");

  if (req.method === "GET") {
    try {
      const savedMenu = await store.get("menu-data", { type: "json" });
      return new Response(JSON.stringify(savedMenu || DEFAULT_MENU), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify(DEFAULT_MENU), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  if (req.method === "POST") {
    if (providedPassword !== expectedPassword) {
      return new Response(JSON.stringify({ error: "Contraseña de administrador inválida" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const body = await req.json();
      if (!body || !Array.isArray(body.sections)) {
        return new Response(JSON.stringify({ error: "Formato de menú inválido" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      await store.setJSON("menu-data", body);
      return new Response(JSON.stringify({ ok: true, message: "Menú actualizado correctamente" }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message || "Error guardando en Netlify Blobs" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
};
