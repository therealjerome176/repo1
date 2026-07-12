// =============================================================
//  GUIDE TO ADDING GAMESa
//
//  Step 1: Copy /gamefiles/_TEMPLATE.html, rename it, paste your
//          game URL where it says PASTE_GAME_URL_HERE.
//
//  Step 2: Add one entry to the GAMES array below.
//
//  ENTRY FORMAT:
//  {
//      title: "Game Name",
//      file:  "mygame.html",        ← filename you created in /gamefiles/
//
//      img:   "https://...",        ← OPTION A: paste any image URL directly
//                                      (right-click image → Copy image address)
//      OR
//      img:   "mygame.webp",        ← OPTION B: filename in /gameimages/ folder
//
//      tags:  ["action"]            ← pick from the list below:
//  }
//
//  AVAILABLE TAGS:
//    action | puzzle | platformer | racing | rpg
//    sandbox | horror | idle | sports | io | multiplayer
// =============================================================

const GAMES = [

    // ── ACTION ───────────────────────────────────────────────
    {
        title: "10 Minutes Till Dawn",
        file:  "10minutestildawn.html",
        img:   "https://iogamesweb.com/thumb/10_Minutes_Till_Dawn.webp",
        tags:  ["action"]
    },
    {
        title: "20 Minutes Till Dawn",
        file:  "20minutestildawn.html",
        img:   "https://assets-prd.ignimgs.com/2022/07/29/20minstilldwan-1659126461551.jpg",
        tags:  ["action"]
    },
    {
        title: "10 Bullets",
        file:  "10bullet.html",
        img:   "https://m.media-amazon.com/images/I/31SAP3S60vL.png",
        tags:  ["action"]
    },
    {
        title: "10 More Bullets",
        file:  "10morebullets.html",
        img:   "https://cdn.aptoide.com/imgs/3/4/1/341e4f4578341df988656a6b04c55eb4_icon.png",
        tags:  ["action"]
    },
    {
        title: "2Doom",
        file:  "2doom.html",
        img:   "2doom.png",
        tags:  ["action"]
    },
    {
        title: "500 Caliber Contractz",
        file:  "500calibercontractz.html",
        img:   "https://i1.sndcdn.com/artworks-mWYMyotTxyhPxyye-yG0zVQ-t500x500.jpg",
        tags:  ["action"]
    },
    {
        title: "Hollow Knight",
        file:  "hollowknight.html",
        img:   "https://assets.nintendo.eu/image/upload/f_auto,c_limit,w_992,q_auto:low/MNS/NOE/70010000003207/SQ_NSwitchDS_HollowKnight",
        tags:  ["platformer", "action"]
    },
    {
        title: "99 Nights In The Forest",
        file:  "99nightsitf.html",
        img:   "https://99-nightsintheforest.io/storage/images/99-nights-in-the-forest-with-emma.jpg",
        tags:  ["action"]
    },

    // ── PUZZLE ───────────────────────────────────────────────
    {
        title: "2048",
        file:  "2048.html",
        img:   "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/2048_logo.svg/1280px-2048_logo.svg.png",
        tags:  ["puzzle"]
    },
    {
        title: "2048 Merge Run",
        file:  "2048mergerun.html",
        img:   "https://play-lh.googleusercontent.com/zzkFt5drc1nOKv9RusiffGpCATRdzvd2-FV5eZ1E16-ZXvSlXTgHsgR4mugXhgnjrx6mwX1ZTlSUuPUfM8McwA",
        tags:  ["puzzle", "idle"]
    },
    {
        title: "20 Small Mazes",
        file:  "20smallmazes.html",
        img:   "https://shared.akamai.steamstatic.com/community_assets/images/apps/2570630/ea4bf6d5fae0cfc86ff10dd37871d94d1af5a048.jpg",
        tags:  ["puzzle"]
    },
    {
        title: "3 Slices 2",
        file:  "3slices2.html",
        img:   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS8FW-HYNLIH3VSoopT0ztmdl_FuFdXBbOQznn2Mqxw5ldkabbsKsqGCI&s=10",
        tags:  ["puzzle"]
    },
    {
        title: "40xescape",
        file:  "40escape.html",
        img:   "https://jayisgames.com/images/tricky_40xescape_image1.png",
        tags:  ["puzzle"]
    },
    {
        title: "9007199254740992",
        file:  "9007199254740992.html",
        img:   "https://moyaimoment.github.io/img/9007199254740992.png",
        tags:  ["puzzle"]
    },
    {
        title: "99 Balls",
        file:  "99balls.html",
        img:   "https://99balls3d.h5games.usercontent.goog/v/0b35ksethbio8/images/big_icon.jpeg",
        tags:  ["puzzle", "idle"]
    },

    // ── RACING ───────────────────────────────────────────────
    {
        title: "2D Rocket League",
        file:  "2drocketleague.html",
        img:   "https://play-lh.googleusercontent.com/WXyLGHqbCpRjpOiGAFT2_3w_nfBwTjItppRBVzvAwDIF1CE1bPc3EVyze2lMaHQFfNBMGG6pbBu0mVfDmReEzg",
        tags:  ["racing", "sports"]
    },

    // ── SPORTS ───────────────────────────────────────────────
    {
        title: "1 On 1 Soccer",
        file:  "1on1soccer.html",
        img:   "https://static.starbie.co.uk/0/60740/35614/1024x1024/1-tegen-1-voetbal.webp",
        tags:  ["sports", "multiplayer"]
    },
    {
        title: "1 On 1 Tennis",
        file:  "1v1tennis.html",
        img:   "https://tcf.admeen.org/category/500/382/400x400/tennis.jpg",
        tags:  ["sports", "multiplayer"]
    },
    {
        title: "3D Bowling",
        file:  "3dbowling.html",
        img:   "https://play-lh.googleusercontent.com/sjHQK5p3iac0B1CKvCVSbOpyrnqVzfj3SQ_pn_dbGi_i6rzL6A3fxalXCc6q9U3Z16EWJU3rRAeQjPGwi1OKJZk",
        tags:  ["sports"]
    },
    {
        title: "4th And Goal",
        file:  "4thandgoal.html",
        img:   "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/6d8c2360b6f5a5228802918450754f8f/4th-and-goal-2022-logo.png",
        tags:  ["sports"]
    },
    {
        title: "8 Ball Classic",
        file:  "8ballclassic.html",
        img:   "https://play-lh.googleusercontent.com/401_itRu07i8AkqC3I2mdcexto1tGyEtme2V0ZiFa6cOP3TzsegqKZ6NLIkk9Z-w-5AP9I1dy5k52GpietbThA",
        tags:  ["sports"]
    },
    {
        title: "8 Ball Pool",
        file:  "8ballpool.html",
        img:   "https://upload.wikimedia.org/wikipedia/en/0/0c/8_Ball_Pool_cover.jpg",
        tags:  ["sports", "multiplayer"]
    },
    {
        title: "A Small World Cup",
        file:  "asmallworldcup.html",
        img:   "https://unblocked-games.s3.amazonaws.com/media/posts/592/a-small-world-cup-512.webp",
        tags:  ["sports", "action"]
    },

    // ── HORROR ───────────────────────────────────────────────
    // (No horror titles were present in this list batch)

    // ── IDLE ─────────────────────────────────────────────────
    {
        title: "1",
        file:  "1.html",
        img:   "1.png",
        tags:  ["idle"]
    },
    {
        title: "3D Pinball Space Cadet",
        file:  "3dpinballspacecadet.html",
        img:   "https://img.itch.zone/aW1nLzIwODQ2ODg2LnBuZw==/original/SV7U0y.png",
        tags:  ["idle"]
    },
    {
        title: "30 Dollar Haircut",
        file:  "30dollarhaircut.html",
        img:   "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-18/256/0739.png",
        tags:  ["idle"]
    },
    {
        title: "64 in 1",
        file:  "64in1.html",
        img:   "https://play-lh.googleusercontent.com/bUsLIQWzItoE8BUTR_0sEStmxcho-wziDGgXD-xCfwIi28f7btqckXwlonohScK9nGe1pAnrDIHYJMJEwK8UJA",
        tags:  ["idle"]
    },

    // ── PLATFORMER ───────────────────────────────────────────
    {
        title: "3Dash",
        file:  "3dashy.html",
        img:   "https://geometrydash-pc.com/data/image/game/3dash.webp",
        tags:  ["platformer"]
    },
    {
        title: "3 Pandas",
        file:  "3pandas.html",
        img:   "https://play-lh.googleusercontent.com/HnX_1Cix6clftHJ8NGTaa7njA4hsyPlh2SuSk85Ay150y9fwwxJKuve3AMqKFelsX_4dN-PEYcnJhkIPCrdQxg",
        tags:  ["platformer", "puzzle"]
    },
    {
        title: "3 Pandas Night",
        file:  "3pandasnight.html",
        img:   "https://play-lh.googleusercontent.com/Lw1iZgoUSZ33q2v_7zAOInqjvnqhkgC-bXOmNGi5axINFdBc9W5vkfRT_SRXw2KLY1vzuG0vM7sGWnnhK29FGpk",
        tags:  ["platformer", "puzzle"]
    },
    {
        title: "3 Pandas Brazil",
        file:  "3pandasbrazil.html",
        img:   "https://play-lh.googleusercontent.com/Lq27uQ4dnXRaB_OoaExOSo6h8UTxBJRd6NPe9aDT5jhsE52bHCj6ZnByw3cFbCPV-Td7Da9vLzcKgm_an61qb1Y",
        tags:  ["platformer", "puzzle"]
    },
    {
        title: "3 Pandas Fantasy",
        file:  "3pandasfantasy.html",
        img:   "https://play-lh.googleusercontent.com/dTaYQpchhGzxlxY2VvnjgqE8uYA7eve7HzTUHuIxpHYnOMJTKjtdAxYDDqZYMqztGqLno1-eR9eqn2gHbyQo3qs",
        tags:  ["platformer", "puzzle"]
    },
    {
        title: "3 Pandas Japan",
        file:  "3pandasjapan.html",
        img:   "https://play-lh.googleusercontent.com/RopPKgEd9w3aZfRMiUxaBVwKakNpJPYR_lwKrTJxFiq64ALTw2kPGIB4dx_lSw3NI2p4vJe3Q-k1ziAzzFIucg",
        tags:  ["platformer", "puzzle"]
    },
    {
        title: "60 Seconds Burger Run",
        file:  "60secondsburgerrun.html",
        img:   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSILoujIV56khF_bxxr7OWOpoGk7TxYZxbDJkMKQthG2nct1igWQ33UY3Nw&s=10",
        tags:  ["platformer", "action"]
    },
    {
        title: "60 Seconds Santa Run",
        file:  "santarun.html",
        img:   "https://evilgames.eu/img/flash/og-60-seconds-santa-run.png",
        tags:  ["platformer", "action"]
    },

    // ── RPG ──────────────────────────────────────────────────
    // (No RPG titles were present in this list batch)

    // ── SANDBOX ──────────────────────────────────────────────
    // (No sandbox titles were present in this list batch)

    // ── MULTIPLAYER ──────────────────────────────────────────
    {
        title: "12 Mini Battles",
        file:  "12minibattles.html",
        img:   "https://play-lh.googleusercontent.com/FClOK2_m2CnumMcsiRKf5W02wK9vsbfVHj4SPOd-Bw36rgtr_2hkaqw0MEHv-jzqRe_4EhIyNzMvVkm8LYdroQ",
        tags:  ["multiplayer", "action"]
    },
    {
        title: "10-103 Null Kelvin",
        file:  "nullkelvin.html",
        img:   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSvA84SmLB8-Dn25ghrKU-h2wvOqHehFirvRigbI9l6cv52ngwqNtXigfe&s=10",
        tags:  ["multiplayer", "action"]
    },
    {
        title: "2-3-4 Player Games",
        file:  "234playergame.html",
        img:   "https://play-lh.googleusercontent.com/hznM-54vOElAhWPe6cB4o8jtKYm6v3atVGPSSSnQXmebOL1nkoH-26DEhvkFUR-lE224-K7AGHkeIgOMmYGa7A",
        tags:  ["multiplayer"]
    },

    // ── IO ────────────────────────────────────────────────────
    {
        title: "1v1.lol",
        file:  "1v1lol.html",
        img:   "https://topgames.gg/data/image/game/1v1-lol.png", 
        tags:  ["io", "multiplayer", "action"]
    },
    
    // ADD MORE GAMES BELOW THIS LINE ──────────────────────────
    // {
    //     title: "My New Game",
    //     file:  "mynewgame.html",
    //     img:   "mynewgame.png",
    //     tags:  ["action"]
    // },

];


// =============================================================
//  GAME PAGE TEMPLATE
//  Save as /gamefiles/GAMENAME.html
//  Replace the src URL with your actual game embed URL.
// =============================================================
//
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>GAME TITLE</title>
//     <style>
//         * { margin: 0; padding: 0; box-sizing: border-box; }
//         body { background: #000; display: flex; flex-direction: column; height: 100vh; font-family: sans-serif; }
//         header { background: #111; color: #fff; padding: 8px 16px; display: flex; align-items: center; gap: 12px; }
//         header a { color: #f5a623; text-decoration: none; font-size: 13px; }
//         iframe { flex: 1; border: none; width: 100%; }
//     </style>
// </head>
// <body>
//     <header>
//         <a href="/">← Back</a>
//         <span>GAME TITLE</span>
//     </header>
//     <iframe src="PASTE_GAME_URL_HERE" allowfullscreen></iframe>
// </body>
// </html>
