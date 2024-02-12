export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile","/statistiques","/dashboard","/decks","/newDeck","/settings", "/contact", "/explore", "/q&a"]
}