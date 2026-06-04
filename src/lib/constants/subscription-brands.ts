import { COLOURS } from './colours';

// Real brand logos from simple-icons (only these slugs are bundled). Imported as
// raw SVG markup so we can recolour them. Brands simple-icons has dropped for
// trademark reasons fall back to coloured initials below.
import netflix from 'simple-icons/icons/netflix.svg?raw';
import spotify from 'simple-icons/icons/spotify.svg?raw';
import youtube from 'simple-icons/icons/youtube.svg?raw';
import youtubemusic from 'simple-icons/icons/youtubemusic.svg?raw';
import applemusic from 'simple-icons/icons/applemusic.svg?raw';
import appletv from 'simple-icons/icons/appletv.svg?raw';
import icloud from 'simple-icons/icons/icloud.svg?raw';
import apple from 'simple-icons/icons/apple.svg?raw';
import google from 'simple-icons/icons/google.svg?raw';
import googleplay from 'simple-icons/icons/googleplay.svg?raw';
import googledrive from 'simple-icons/icons/googledrive.svg?raw';
import hbomax from 'simple-icons/icons/hbomax.svg?raw';
import dropbox from 'simple-icons/icons/dropbox.svg?raw';
import github from 'simple-icons/icons/github.svg?raw';
import notion from 'simple-icons/icons/notion.svg?raw';
import figma from 'simple-icons/icons/figma.svg?raw';
import zoom from 'simple-icons/icons/zoom.svg?raw';
import paramountplus from 'simple-icons/icons/paramountplus.svg?raw';
import audible from 'simple-icons/icons/audible.svg?raw';
import patreon from 'simple-icons/icons/patreon.svg?raw';
import twitch from 'simple-icons/icons/twitch.svg?raw';
import playstation from 'simple-icons/icons/playstation.svg?raw';
import crunchyroll from 'simple-icons/icons/crunchyroll.svg?raw';
import duolingo from 'simple-icons/icons/duolingo.svg?raw';
import anthropic from 'simple-icons/icons/anthropic.svg?raw';
import claude from 'simple-icons/icons/claude.svg?raw';
import discord from 'simple-icons/icons/discord.svg?raw';
import dazn from 'simple-icons/icons/dazn.svg?raw';

// Matched by substring (lowercase). Most specific keys first so e.g.
// "YouTube Music" beats "YouTube", "Apple Music" beats "Apple".
const LOGO_BRANDS: { keys: string[]; colour: string; svg: string }[] = [
	{ keys: ['netflix'], colour: '#E50914', svg: netflix },
	{ keys: ['spotify'], colour: '#1DB954', svg: spotify },
	{ keys: ['youtube music'], colour: '#FF0000', svg: youtubemusic },
	{ keys: ['youtube'], colour: '#FF0000', svg: youtube },
	{ keys: ['apple music'], colour: '#FA243C', svg: applemusic },
	{ keys: ['apple tv'], colour: '#000000', svg: appletv },
	{ keys: ['icloud'], colour: '#3693F3', svg: icloud },
	{ keys: ['apple'], colour: '#555555', svg: apple },
	{ keys: ['google play'], colour: '#01875F', svg: googleplay },
	{ keys: ['google drive', 'google one'], colour: '#4285F4', svg: googledrive },
	{ keys: ['google'], colour: '#4285F4', svg: google },
	{ keys: ['hbo', 'max'], colour: '#0046FF', svg: hbomax },
	{ keys: ['dropbox'], colour: '#0061FF', svg: dropbox },
	{ keys: ['github'], colour: '#181717', svg: github },
	{ keys: ['notion'], colour: '#000000', svg: notion },
	{ keys: ['figma'], colour: '#F24E1E', svg: figma },
	{ keys: ['zoom'], colour: '#0B5CFF', svg: zoom },
	{ keys: ['paramount'], colour: '#0064FF', svg: paramountplus },
	{ keys: ['audible'], colour: '#F8991C', svg: audible },
	{ keys: ['patreon'], colour: '#F96854', svg: patreon },
	{ keys: ['twitch'], colour: '#9146FF', svg: twitch },
	{ keys: ['playstation', 'ps plus', 'ps+'], colour: '#0070D1', svg: playstation },
	{ keys: ['crunchyroll'], colour: '#F47521', svg: crunchyroll },
	{ keys: ['duolingo'], colour: '#58CC02', svg: duolingo },
	{ keys: ['claude'], colour: '#D97757', svg: claude },
	{ keys: ['anthropic'], colour: '#D97757', svg: anthropic },
	{ keys: ['discord'], colour: '#5865F2', svg: discord },
	{ keys: ['dazn'], colour: '#0F1419', svg: dazn }
];

// Colour-only brands (simple-icons no longer ships these logos).
const FALLBACK_COLOURS: Record<string, string> = {
	disney: '#113CCF',
	amazon: '#FF9900',
	prime: '#00A8E1',
	adobe: '#DA1F26',
	microsoft: '#0078D4',
	office: '#D83B01',
	hulu: '#1CE783',
	canva: '#00C4CC',
	slack: '#4A154B',
	xbox: '#107C10',
	nintendo: '#E60012',
	openai: '#10A37F',
	chatgpt: '#10A37F',
	linkedin: '#0A66C2',
	stan: '#2BA8E1',
	binge: '#FF6900',
	kayo: '#23D17A'
};

function hashColour(key: string): string {
	let hash = 0;
	for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
	return COLOURS[hash % COLOURS.length];
}

/**
 * Resolves a subscription name to a brand colour + initial, and a real logo SVG
 * when one is available.
 */
export function brandStyle(name: string): { colour: string; letter: string; svg?: string } {
	const key = name.trim().toLowerCase();
	const letter = (name.trim()[0] || '?').toUpperCase();

	for (const b of LOGO_BRANDS) {
		if (b.keys.some((k) => key.includes(k))) return { colour: b.colour, letter, svg: b.svg };
	}

	let colour: string | undefined;
	for (const [brand, c] of Object.entries(FALLBACK_COLOURS)) {
		if (key.includes(brand)) {
			colour = c;
			break;
		}
	}
	return { colour: colour ?? hashColour(key || '?'), letter };
}
