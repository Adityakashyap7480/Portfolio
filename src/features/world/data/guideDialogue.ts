export type GuideSpeaker = 'helper' | 'player'

export const GUIDE_GREETING = {
  helper: 'Hey there! Need a hand exploring?',
  player: 'Yes please — show me around!',
}

/** When the player replies, measured from the start of the greeting */
export const GREETING_REPLY_AT_MS = 1400
/** Total greeting length before the section picker opens */
export const GREETING_DURATION_MS = 2900
