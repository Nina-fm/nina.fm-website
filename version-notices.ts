export type Notice = {
  satisfies: string
  title?: string
  message?: string
}

/**
 * The notices to display depending on the previous stored version and the current version
 *
 * The satisfies attribute use the semver synthax: https://docs.npmjs.com/cli/v6/using-npm/semver
 * to determine if the previously stored version should display the notice
 */
const versionNotices: ObjectOf<Notice> = {
  "0.4.4": {
    satisfies: ">=0.4.1 <0.4.4",
    title: "Puisse la musique être avec vous",
    message: `<p>Vous l'aurez probablement constaté, 
    Nina.fm a subi quelques incidents techniques ces derniers jours. 
    En effet, dans un souci permanent d'amélioration de nos services, 
    nous procédons régulièrement à des travaux sur le site et malgré nos efforts, 
    il arrive que des bugs réussissent à passer à travers les mailles de nos filets.</p>
    <p class='my-2'>Nina.fm est à nouveau pleinement opérationnelle, mais vos messages 
    seront toujours les bienvenus dans le cas contraire !</p>
    <p>Nous vous prions de bien vouloir nous excuser pour la gêne occasionnée 
    et vous remercions pour votre patience et votre soutien indéfectible.</p>
    <p class='signature'>L'équipe Nina.fm</p>`,
  },
}

export default versionNotices
