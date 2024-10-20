import type { IconAliases, IconProps, IconSet } from "vuetify"

import { h } from "vue"
import { aliases as mdiAliases } from "vuetify/iconsets/mdi"

export const aliases: IconAliases = {
  // Vuetify defaults
  ...mdiAliases,
  // Customs
  ninaTransfer: "nina-icon-transfer",
  ninaloopAlt3: "nina-icon-loop-alt3",
  ninaloopAlt2: "nina-icon-loop-alt2",
  ninaloop1: "nina-icon-loop1",
  ninaloop: "nina-icon-loop",
  ninaInvertColorsOn: "nina-icon-invert_colors_on",
  ninaAlbum: "nina-icon-album",
  ninaAutorenew: "nina-icon-autorenew",
  ninaBright1: "nina-icon-brightness_1",
  ninaBright2: "nina-icon-brightness_2",
  ninaBright3: "nina-icon-brightness_3",
  ninaBright4: "nina-icon-brightness_4",
  ninaBrightAuto: "nina-icon-brightness_auto",
  ninaBrightLow: "nina-icon-brightness_low",
  ninaBullhorn: "nina-icon-bullhorn",
  ninaClose: "nina-icon-close",
  ninaCloseCircle: "nina-icon-highlight_off",
  ninaColours: "nina-icon-colours",
  ninaDancer: "nina-icon-noun_dancer",
  ninaDrop: "nina-icon-drop",
  ninaDroplet: "nina-icon-droplet",
  ninaFacebook: "nina-icon-facebook-official",
  ninaFacebookF: "nina-icon-facebook-f",
  ninaFire: "nina-icon-fire",
  ninaFullscreen: "nina-icon-fullscreen",
  ninaFullscreenExit: "nina-icon-fullscreen_exit",
  ninaGift: "nina-icon-gift",
  ninaLabFlask: "nina-icon-lab-flask",
  ninaLens: "nina-icon-color_lens",
  ninaMail: "nina-icon-mail_outline",
  ninaMenu: "nina-icon-menu",
  ninaNext: "nina-icon-navigate_next",
  ninaPauseCircle: "nina-icon-pause_circle_filled",
  ninaPauseCircleOutline: "nina-icon-pause_circle_outline",
  ninaPlay: "nina-icon-play_arrow",
  ninaPlayCircleFilled: "nina-icon-play_circle_filled",
  ninaPlayCircleOutline: "nina-icon-play_circle_outline",
  ninaPlaylistAdd: "nina-icon-playlist_add",
  ninaPlaylistCheck: "nina-icon-playlist_add_check",
  ninaPlaylistPlay: "nina-icon-playlist_play",
  ninaPlusCircle: "nina-icon-add_circle",
  ninaPlusCircleOutline: "nina-icon-add_circle_outline",
  ninaPrev: "nina-icon-navigate_before",
  ninaQueueMusic: "nina-icon-queue_music",
  ninaQuote: "nina-icon-quote",
  ninaRemoveCircle: "nina-icon-remove_circle",
  ninaRemoveCircleOutline: "nina-icon-remove_circle_outline",
  ninaReorder: "nina-icon-reorder",
  ninaRocket: "nina-icon-rocket",
  ninaSend: "nina-icon-send",
  ninaSortAsc: "nina-icon-expand_less",
  ninaSortDesc: "nina-icon-expand_more",
  ninaSpiral: "nina-icon-noun_spiral",
  ninaSunny: "nina-icon-wb_sunny",
  ninaTelescope: "nina-icon-telescope",
  ninaVolumeDown: "nina-icon-volume_down",
  ninaVolumeMute: "nina-icon-volume_mute",
  ninaVolumeOff: "nina-icon-volume_off",
  ninaVolumeUp: "nina-icon-volume_up",
  ninaYoga: "nina-icon-noun_yoga",
  ninaYoga2: "nina-icon-noun_yoga_2",
  ninaYoga3: "nina-icon-noun_yoga_3",
}

export const nina: IconSet = {
  component: (props: IconProps) => h(props.tag, { class: ["nina", props.icon] }),
}

export default { aliases, nina }
