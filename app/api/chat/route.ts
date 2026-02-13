import { NextResponse } from "next/server";

function pickReply(userText: string) {
  const t = userText.toLowerCase();

  // Intent detection (simple)
  const likesArt = /art|peinture|musée|renaissance|michel-ange|sculpture|architecture/.test(t);
  const likesAdventure = /aventure|adrénaline|dinos|dinosaure|danger|survie|exploration|jurassique|crétacé/.test(t);
  const likesHistory = /histoire|belle époque|eiffel|exposition|1889|paris/.test(t);
  const family = /famille|enfant|enfants|bébé|safe|sécurit/.test(t);
  const price = /prix|tarif|budget|coût|combien/.test(t);
  const hello = /bonjour|bonsoir|salut|coucou/.test(t);

  if (hello) {
    return "Bonsoir 👋 Dites-moi ce que vous aimez (art, aventure, histoire, calme…) et je vous propose la meilleure époque.";
  }

  // Prices (luxury)
  if (price) {
    if (likesArt) {
      return "Pour Florence 1504 (expérience luxe), comptez ~4 900€ / personne (guide privé + ateliers d’art + hébergement premium).";
    }
    if (likesAdventure) {
      return "Pour le Crétacé -65M, c’est une expédition premium (~7 900€ / personne) avec équipe sécurité, zone contrôlée et briefing survie.";
    }
    return "Pour Paris 1889, l’offre luxe démarre à ~3 500€ / personne (visite privée, accès VIP, itinéraire Belle Époque).";
  }

  // Family-safe
  if (family) {
    return "Pour une expérience “safe” en famille, je recommande Paris 1889 : ambiance Belle Époque, activités culturelles, risques faibles et très encadré.";
  }

  // Recommendations
  if (likesArt) {
    return "Si vous aimez l’art, Florence 1504 est idéale : Renaissance, Michel-Ange, ateliers et architecture exceptionnelle. Voulez-vous plutôt musées ou ateliers ?";
  }
  if (likesAdventure) {
    return "Pour l’aventure, le Crétacé -65M : nature préhistorique et dinosaures. C’est encadré, mais il y a du risque. Vous cherchez sensations fortes ou observation ?";
  }
  if (likesHistory) {
    return "Pour l’histoire, Paris 1889 : Tour Eiffel, Exposition Universelle, ambiance Belle Époque. Vous préférez visites culturelles ou expérience “VIP” ?";
  }

  // Generic helpful fallback
  return "Je peux vous proposer : Paris 1889 (culture & Belle Époque), Crétacé -65M (aventure & dinos), Florence 1504 (art & Renaissance). Qu’est-ce qui vous attire le plus ?";
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastUser = Array.isArray(messages)
      ? [...messages].reverse().find((m: any) => m?.role === "user")?.content
      : "";

    const reply = pickReply(String(lastUser || ""));
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: "Désolé, je n’ai pas compris. Pouvez-vous reformuler ?" });
  }
}
