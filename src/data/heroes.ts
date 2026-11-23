// src/data/heroes.ts

import type { Hero, ClassType, Faction, Rarity } from '../domain/types'

export interface HeroTemplate {
  id: string
  name: string
  class: ClassType
  faction: Faction
  rarity: Rarity
  animeOrigin: string
  baseStats: { hp: number; atk: number; def: number; spd: number; critRate: number; critDmg: number }
  skills: { id: string; name: string; type: 'basic' | 'active' | 'ultimate' | 'passive' | 'awaken'; description: string; cooldown?: number; damageMultiplier?: number }[]
  bonds: string[]
}

export const HERO_TEMPLATES: HeroTemplate[] = [
  // === LIGHTFORGED (Naruto theme) ===
  {
    id: 'naruto_uzumaki',
    name: 'Naruto Uzumaki',
    class: 'Assault',
    faction: 'Lightforged',
    rarity: 'SSR+',
    animeOrigin: 'Naruto',
    baseStats: { hp: 1200, atk: 320, def: 180, spd: 110, critRate: 0.15, critDmg: 1.5 },
    skills: [
      { id: 'rasengan', name: 'Rasengan', type: 'active', description: 'Bola chakra yang menimbulkan damage besar', cooldown: 3, damageMultiplier: 2.5 },
      { id: 'sage_mode', name: 'Sage Mode', type: 'ultimate', description: 'Mode bijak, boost semua stat 50%', cooldown: 6, damageMultiplier: 4.0 },
      { id: 'shadow_clone', name: 'Shadow Clone', type: 'passive', description: 'Serangan tambahan tiap 2 turn' },
    ],
    bonds: ['sasuke_uchiha', 'sakura_haruno'],
  },
  {
    id: 'sasuke_uchiha',
    name: 'Sasuke Uchiha',
    class: 'Assassin',
    faction: 'Lightforged',
    rarity: 'SSR+',
    animeOrigin: 'Naruto',
    baseStats: { hp: 900, atk: 380, def: 140, spd: 130, critRate: 0.25, critDmg: 1.8 },
    skills: [
      { id: 'chidori', name: 'Chidori', type: 'active', description: 'Serangan petir yang menembus pertahanan', cooldown: 3, damageMultiplier: 3.0 },
      { id: 'amaterasu', name: 'Amaterasu', type: 'ultimate', description: 'Api hitam yang membakar musuh', cooldown: 6, damageMultiplier: 4.5 },
      { id: 'sharingan', name: 'Sharingan', type: 'passive', description: '+20% crit rate, counter attack' },
    ],
    bonds: ['naruto_uzumaki', 'itachi_uchiha'],
  },
  {
    id: 'kakashi_hatake',
    name: 'Kakashi Hatake',
    class: 'Control',
    faction: 'Lightforged',
    rarity: 'SSR',
    animeOrigin: 'Naruto',
    baseStats: { hp: 1000, atk: 260, def: 160, spd: 120, critRate: 0.18, critDmg: 1.5 },
    skills: [
      { id: 'raikiri', name: 'Raikiri', type: 'active', description: 'Chidori versi sempurna', cooldown: 3, damageMultiplier: 2.8 },
      { id: 'kamui', name: 'Kamui', type: 'ultimate', description: 'Teleportasi musuh ke dimensi lain', cooldown: 7, damageMultiplier: 3.5 },
      { id: 'copy_ninja', name: 'Copy Ninja', type: 'passive', description: 'Copy skill musuh 1x per battle' },
    ],
    bonds: ['naruto_uzumaki', 'sasuke_uchiha'],
  },

  // === ARCANE (JJK theme) ===
  {
    id: 'gojo_satoru',
    name: 'Gojo Satoru',
    class: 'Control',
    faction: 'Arcane',
    rarity: 'SSR+',
    animeOrigin: 'Jujutsu Kaisen',
    baseStats: { hp: 1100, atk: 300, def: 170, spd: 125, critRate: 0.2, critDmg: 1.6 },
    skills: [
      { id: 'hollow_purple', name: 'Hollow Purple', type: 'active', description: 'Gabungan Red + Blue, damage masif', cooldown: 4, damageMultiplier: 3.2 },
      { id: 'unlimited_void', name: 'Unlimited Void', type: 'ultimate', description: 'Domain expansion, stun semua musuh', cooldown: 7, damageMultiplier: 2.0 },
      { id: 'infinity', name: 'Infinity', type: 'passive', description: '30% chance menghindari serangan' },
    ],
    bonds: ['yuji_itadori', 'megumi_fushiguro'],
  },
  {
    id: 'yuji_itadori',
    name: 'Yuji Itadori',
    class: 'Assault',
    faction: 'Arcane',
    rarity: 'SSR',
    animeOrigin: 'Jujutsu Kaisen',
    baseStats: { hp: 1300, atk: 290, def: 190, spd: 105, critRate: 0.15, critDmg: 1.5 },
    skills: [
      { id: 'divergent_fist', name: 'Divergent Fist', type: 'active', description: 'Pukulan dengan delay cursed energy', cooldown: 2, damageMultiplier: 2.0 },
      { id: 'black_flash', name: 'Black Flash', type: 'ultimate', description: 'Pukulan dengan cursed energy, damage x2.5', cooldown: 5, damageMultiplier: 5.0 },
      { id: 'sukuna_vessel', name: 'Sukuna Vessel', type: 'passive', description: '20% chance extra attack' },
    ],
    bonds: ['gojo_satoru', 'megumi_fushiguro'],
  },
  {
    id: 'sukuna',
    name: 'Ryomen Sukuna',
    class: 'Assassin',
    faction: 'Arcane',
    rarity: 'UR',
    animeOrigin: 'Jujutsu Kaisen',
    baseStats: { hp: 1000, atk: 420, def: 130, spd: 135, critRate: 0.3, critDmg: 2.0 },
    skills: [
      { id: 'cleave', name: 'Cleave', type: 'active', description: 'Potong musuh sesuai HP mereka', cooldown: 3, damageMultiplier: 3.5 },
      { id: 'malevolent_shrine', name: 'Malevolent Shrine', type: 'ultimate', description: 'Domain expansion, AoE damage', cooldown: 6, damageMultiplier: 5.5 },
      { id: 'king_of_curses', name: 'King of Curses', type: 'passive', description: '+30% damage, immune control' },
    ],
    bonds: ['yuji_itadori'],
  },

  // === KINDRED (Bleach theme) ===
  {
    id: 'ichigo_kurosaki',
    name: 'Ichigo Kurosaki',
    class: 'Assault',
    faction: 'Kindred',
    rarity: 'SSR+',
    animeOrigin: 'Bleach',
    baseStats: { hp: 1250, atk: 330, def: 185, spd: 115, critRate: 0.18, critDmg: 1.6 },
    skills: [
      { id: 'getsuga_tensho', name: 'Getsuga Tensho', type: 'active', description: 'Slash energi yang membelah musuh', cooldown: 3, damageMultiplier: 2.8 },
      { id: 'bankai', name: 'Bankai', type: 'ultimate', description: 'Transformasi, boost semua stat 60%', cooldown: 6, damageMultiplier: 4.2 },
      { id: 'hollow_power', name: 'Hollow Power', type: 'passive', description: 'Bleed effect pada serangan' },
    ],
    bonds: ['rukia_kuchiki', 'orihime_inoue'],
  },
  {
    id: 'rukia_kuchiki',
    name: 'Rukia Kuchiki',
    class: 'Control',
    faction: 'Kindred',
    rarity: 'SSR',
    animeOrigin: 'Bleach',
    baseStats: { hp: 950, atk: 270, def: 150, spd: 118, critRate: 0.16, critDmg: 1.5 },
    skills: [
      { id: 'hakuren', name: 'Hakuren', type: 'active', description: 'Serangan es yang freeze musuh', cooldown: 3, damageMultiplier: 2.2 },
      { id: 'bankai_hakka', name: 'Hakka no Togame', type: 'ultimate', description: 'Bankai es, damage masif + freeze', cooldown: 6, damageMultiplier: 4.0 },
      { id: 'kido', name: 'Kido', type: 'passive', description: 'Debuff accuracy musuh' },
    ],
    bonds: ['ichigo_kurosaki'],
  },
  {
    id: 'aizen_sosuke',
    name: 'Aizen Sosuke',
    class: 'Control',
    faction: 'Kindred',
    rarity: 'UR',
    animeOrigin: 'Bleach',
    baseStats: { hp: 1050, atk: 310, def: 160, spd: 122, critRate: 0.22, critDmg: 1.7 },
    skills: [
      { id: 'kyoka_suigetsu', name: 'Kyoka Suigetsu', type: 'active', description: 'Ilusi sempurna, musuh salah target', cooldown: 4, damageMultiplier: 2.5 },
      { id: 'hogyoku', name: 'Hogyoku', type: 'ultimate', description: 'Evolusi, boost semua stat 80%', cooldown: 8, damageMultiplier: 5.0 },
      { id: 'hypnosis', name: 'Hypnosis', type: 'passive', description: 'Musuh 25% chance miss attack' },
    ],
    bonds: [],
  },

  // === DEMONHUNT (One Piece theme) ===
  {
    id: 'luffy_monkey',
    name: 'Monkey D. Luffy',
    class: 'Assault',
    faction: 'Demonhunt',
    rarity: 'SSR+',
    animeOrigin: 'One Piece',
    baseStats: { hp: 1400, atk: 310, def: 200, spd: 100, critRate: 0.15, critDmg: 1.5 },
    skills: [
      { id: 'gum_gum_pistol', name: 'Gum-Gum Pistol', type: 'active', description: 'Pukulan elastis jarak jauh', cooldown: 2, damageMultiplier: 2.2 },
      { id: 'gear_5', name: 'Gear 5', type: 'ultimate', description: 'Awakening, ubah medan perang', cooldown: 7, damageMultiplier: 4.8 },
      { id: 'rubber_body', name: 'Rubber Body', type: 'passive', description: '+20% HP, immune blunt damage' },
    ],
    bonds: ['zoro_roronoa', 'sanji_vinsmoke'],
  },
  {
    id: 'zoro_roronoa',
    name: 'Roronoa Zoro',
    class: 'Assassin',
    faction: 'Demonhunt',
    rarity: 'SSR+',
    animeOrigin: 'One Piece',
    baseStats: { hp: 1100, atk: 360, def: 160, spd: 115, critRate: 0.28, critDmg: 1.9 },
    skills: [
      { id: 'three_sword_style', name: 'Three Sword Style', type: 'active', description: '3 pedang sekaligus, damage tinggi', cooldown: 3, damageMultiplier: 3.2 },
      { id: 'asura', name: 'Asura', type: 'ultimate', description: '9 pedang ilusi, AoE damage', cooldown: 6, damageMultiplier: 4.6 },
      { id: 'king_of_hell', name: 'King of Hell', type: 'passive', description: 'Crit damage +50% saat HP < 50%' },
    ],
    bonds: ['luffy_monkey'],
  },
  {
    id: 'sanji_vinsmoke',
    name: 'Sanji Vinsmoke',
    class: 'Assault',
    faction: 'Demonhunt',
    rarity: 'SSR',
    animeOrigin: 'One Piece',
    baseStats: { hp: 1050, atk: 300, def: 150, spd: 120, critRate: 0.2, critDmg: 1.6 },
    skills: [
      { id: 'diable_jambe', name: 'Diable Jambe', type: 'active', description: 'Tendangan api, burn effect', cooldown: 3, damageMultiplier: 2.6 },
      { id: 'ifrit_jambe', name: 'Ifrit Jambe', type: 'ultimate', description: 'Api biru, damage masif', cooldown: 6, damageMultiplier: 4.0 },
      { id: 'black_leg', name: 'Black Leg', type: 'passive', description: 'Tendangan cepat, +speed' },
    ],
    bonds: ['luffy_monkey', 'zoro_roronoa'],
  },

  // === VOID (One Punch Man theme) ===
  {
    id: 'saitama',
    name: 'Saitama',
    class: 'Assault',
    faction: 'Void',
    rarity: 'EX',
    animeOrigin: 'One Punch Man',
    baseStats: { hp: 2000, atk: 500, def: 300, spd: 90, critRate: 0.1, critDmg: 3.0 },
    skills: [
      { id: 'serious_punch', name: 'Serious Punch', type: 'active', description: 'Satu pukulan serius, damage masif', cooldown: 4, damageMultiplier: 8.0 },
      { id: 'consecutive_punches', name: 'Consecutive Normal Punches', type: 'ultimate', description: 'Pukulan bertubi-tubi', cooldown: 6, damageMultiplier: 6.0 },
      { id: 'limitless', name: 'Limitless', type: 'passive', description: 'Tidak bisa mati dalam 1 hit' },
    ],
    bonds: [],
  },
  {
    id: 'genos',
    name: 'Genos',
    class: 'Assault',
    faction: 'Void',
    rarity: 'SSR',
    animeOrigin: 'One Punch Man',
    baseStats: { hp: 1100, atk: 340, def: 170, spd: 110, critRate: 0.2, critDmg: 1.7 },
    skills: [
      { id: 'incineration_cannon', name: 'Incineration Cannon', type: 'active', description: 'Laser api yang membakar', cooldown: 3, damageMultiplier: 3.0 },
      { id: 'spiral_incineration', name: 'Spiral Incineration', type: 'ultimate', description: 'Api spiral, AoE damage', cooldown: 6, damageMultiplier: 4.5 },
      { id: 'cyborg_body', name: 'Cyborg Body', type: 'passive', description: 'Regen HP per turn' },
    ],
    bonds: ['saitama'],
  },
  {
    id: 'tatsumaki',
    name: 'Tatsumaki',
    class: 'Control',
    faction: 'Void',
    rarity: 'UR',
    animeOrigin: 'One Punch Man',
    baseStats: { hp: 900, atk: 280, def: 140, spd: 130, critRate: 0.22, critDmg: 1.6 },
    skills: [
      { id: 'psychic_crush', name: 'Psychic Crush', type: 'active', description: 'Hancurkan musuh dengan telekinesis', cooldown: 3, damageMultiplier: 2.8 },
      { id: 'gravity_catastrophe', name: 'Gravity Catastrophe', type: 'ultimate', description: 'Tarik semua musuh, damage masif', cooldown: 7, damageMultiplier: 4.2 },
      { id: 'esper', name: 'Esper', type: 'passive', description: 'Control immunity' },
    ],
    bonds: [],
  },
]

export function createHeroFromTemplate(template: HeroTemplate): Hero {
  return {
    id: `${template.id}_${Date.now()}`,
    name: template.name,
    class: template.class,
    faction: template.faction,
    rarity: template.rarity,
    animeOrigin: template.animeOrigin,
    baseStats: { ...template.baseStats },
    skills: template.skills.map((s) => ({ ...s, effect: undefined, effectStacks: undefined })),
    bonds: [...template.bonds],
    starLevel: 1,
    level: 1,
    limitBreak: 0,
    awakened: false,
    copies: 0,
  }
}
