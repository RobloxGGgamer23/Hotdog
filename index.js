const Discord = require('discord.js');
const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const { get } = require('request');
const random = require('random');
const jsonfile = require('jsonfile');

const client = new Discord.Client();
const prefix = '`'


client.commands = new Discord.Collection();

var stats = {};

if (fs.existsSync('stats.json')) {
    stats = jsonfile.readFileSync('stats.json')
}

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

// NzY2MjMzMDU3MDgxNTU2OTkz.X4gYJA.P9_iLZleohvWoU9VGDa-Y1py33U HS

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        console.log(args[0])
        const p = await message.channel.send('pingging!')
        const pingEmbed = new Discord.MessageEmbed()
         .setTitle(`${message.author.username}'s ping`)
         .addField('ping', `${p.createdTimestamp - message.createdTimestamp}ms`)
         .setFooter(`${message.author.username}`)
         .setColor(0x76448A);
        message.channel.send(pingEmbed)

    } else if (command === 'inv' || command === 'invite' || command === 'bring') {

        message.channel.send('make sure to invite me to your server https://discord.com/oauth2/authorize?client_id=766233057081556993&scope=bot&permissions=8');

    } else if (command === 'adobo' || command === 'adobopic') {
        // adobo
        client.commands.get('adobopic').execute(message, args, request, cheerio);

    } else if (command === 'shey' || command === 'shawn') {
        // shey
        message.channel.send('https://cdn.discordapp.com/attachments/766238693958221854/766259523232333854/120837062_1042923949506129_870779903767820629_n.jpg');

    } else if (command === 'hotdog' || command === 'hotdogpic') {
        // hotdog
        client.commands.get('Hotdog').execute(message, args, request, cheerio);

    } else if (command === 'lansones' || command === 'sheyfave') {
        // lansones
        client.commands.get('Lansones').execute(message, args, request, cheerio);

    } else if (command === 'tinola' || command === 'tinolapic') {
        // tinola
        tinola(message);

    } else if (command === 'ruth' || command === 'alien') {
        // alien
        message.channel.send('https://media.discordapp.net/attachments/766238693958221854/766286445387317288/download_33.jpeg');

    } else if (command === 'nishinoyaa' || command === 'nishinoya') {
        // nishinoya
        if (message.member.roles.cache.has('764827739383136266')) {
            message.channel.send('https://cdn.discordapp.com/attachments/752343553648361554/766521835847942155/images_47.jpeg');
        } else
        message.channel.send('You dont have permission to say this command!')
    }  else if (command === 'kuroo' || command === 'aizel') {
        // kuroo
        if (message.member.roles.cache.has('764827739383136266') || message.member.roles.cache.has('764844538337689650') || message.member.roles.cache.has('764829713553817600')) {
            message.channel.send('https://cdn.discordapp.com/attachments/764825416228667402/766533615727018024/download_34.jpeg');
        } else 
        message.channel.send('You dont have permission to say this command!')
    } else if (command === 'hello') {
        // hello
        message.reply('hi')

    } else if (command === 'hahaha' || command === 'luagh' || command === 'lol') {
        // lol
        message.channel.send('HAHAHAHAHAHHA' || 'XD')

    } else if (command === 'dab' || command === 'nice') {
        // dab
        message.channel.send('https://images-ext-2.discordapp.net/external/DxwsE5ubmBJcrlpBC6W-5UNY6xSNCyl4ajPwzhOdEIk/https/media.discordapp.net/attachments/766262310985269309/766932578719498250/wTmFj51S0_Z8WQwlJhk3Ox2GWxLEvIeDUJtDOXlqcI5Ja3VMCb01hrW7AGoLIc80OK3gKws85.png');

    } else if (command === 'verify') {
        // verify
        const verify = message.member.roles.add('765134945164591124')
        verify
        message.member.send('a role has been added.')
        message.delete();
    } else if (command === 'lonely' || command === 'alone') {
        alone(message);
    } else if (command === 'module') {
        message.channel.send('1+1 = 2' || '5+5 = 10') || message.channel.send('5+5 = 10') || message.channel.send('THATS HARD')
    } else if (command === 'hi') {
        // verify
        const code1 = message.member.roles.add('766478296576819200')
        const code2 = message.member.roles.add('765134945164591124')
        code1
        code2
        message.delete();
    }

    if (command === 'ship' || command === 'likes') {
        const Ship = message.mentions.users.first();
        if (Ship) {
            message.channel.send( message.member.displayName + ` X ${Ship.username}`)
        }
    } else if (command === 'search' || command === 'find' || command === 'google') {
        const Search = command[1]
        search(message);
        // search
        function search(message){

            var options = {
                url: "http://results.dogpile.com/serp?qc=images&q=" + `${message.content.slice(prefix.length + command.length).split(/ +/)}`,
                method: "GET",
                headers: {
                    "Accept": "text/html",
                    "User-Agent": "Chrome"
                }
            };
            console.log(message.content.slice(prefix.length + command.length + 1).split(/ +/))
            request(options, function(error, response, responseBody) {
                if (error) {
                    return;
                }
        
        
                $ = cheerio.load(responseBody);
        
        
                var links = $(".image a.link");
        
                var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
            
                console.log(urls);
        
                if (!urls.length) {
                
                    return;
                }     
                // Send result
                message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
            });
        };
    
    }

     // leveling
     
     if (!message.guild.id in stats) {
        stats[message.guild.id] = {};
     }

     const guildStats = stats[message.guild.id]
     if (!message.author.id in guildStats) {
         guildStats[message.author.id] = {
             xp: 0,
             level: 0,
             last_message: 0,
         };
     }
     if (Date.now() - userStats.last_message > 60000) {
        const userStats = guildStats[message.author.id]
        userStats += random.int(10, 20);

        console.log(`${message.author} now has ${userStats.xp}`)

        const xpToNextLevel = 5 * Math.pow(userStats.level, 2) + 50 * userStats.level + 100;
        if (userStats.xp >= xpToNextLevel) {
            userStats.level ++;
            userStats.xp = userStats.xp - xpToNextLevel
            message.channel.send(`congrats ${message.author} you reached level ${userStats.level}`)
        }
    }

    if (command === 'rank' || command === 'level') {
        message.channel.send('the rank cmd has worked')
        const rankEmbed = Discord.MessageEmbed()
         .setTitle(`${message.author.username}'s rank`)
         .addField('level', `your level is ${userStats.level}, your xp is ${userStats.xp}`)
         .setDescription('https://media.discordapp.net/attachments/767778042101497886/768623903190286386/Screenshot_312.png');
        message.channel.send(rankEmbed)
    }

     jsonfile.writeFileSync('stats.json', stats)
     // admin cmds

     if (message.member.hasPermission('ADMINISTRATOR')) {
        if (command === 'say') {
            message.channel.send('"' + message.content.slice(prefix.length + command.length) + ' " -' + message.author.username)
            message.delete();
        } else if (command === 'kick' || command === 'k') {
           const userKick = message.mentions.users.first();

           if (userKick) {
               var member = message.guild.member(userKick);

               if (member) {
                   if (member.hasPermission('ADMINISTRATOR')){
                       message.reply('You cannot kick a Mod!')
                   } else if (message.author.bot) {
                       message.reply('You cannot kick my friends!')
                   }
                   member.kick({
                       reason: 'You have been kicked by the owner or a mod!'
                   }).then(() => {
                       message.reply(`${userKick} has been kicked.`)
                   })
               } else
               message.reply(`that user is not in the server!`)
           }
        } else if (command === 'ban' || command === 'b') {
            const userBan = message.mentions.users.first();

            if (userBan) {
                var member = message.guild.member(userBan);
 
                if (member) {
                    if (member.hasPermission('ADMINISTRATOR')){
                        message.reply('You cannot ban a Mod!')
                    } else if (message.author.bot) {
                        message.reply('You cannot ban my friends!')
                    }
                    member.ban({
                        reason: 'You have been BANNED by the owner or a mod!'
                    }).then(() => {
                        message.reply(`${userBan} has been BANNED.`)
                    })
                } else
                message.reply(`that user is not in the server!`)
            }
        } else if (command === 'newrole') {
            const NewRole = message.mentions.users.first();
            var member = message.guild.member(NewRole);
            message.guild.roles.create({
                data: {
                    name: `${message.content.slice(prefix.length + command.length).split(/ +/)[1]}`,
                    color: 'BLUE' || 'RED',
                    mentionable: true,
                    permissions: ['READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'CREATE_INSTANT_INVITE', 'ADD_REACTIONS'],
                },
                reason: 'a role for that user',
                })
                .then(console.log)
                .catch(console.error);
            message.channel.send(`new role has been created name: **${message.content.slice(prefix.length + command.length).split(/ +/)[1]}**`)
        } else if (command === 'clear' || command === 'delete' || command === 'dangerous' ) {
            if (message.author.id === '711523498778165258') {
                if (args[0] >= 100) {
                    message.channel.send('cannot delete that much messages!')
                } if (!args[1]) {
                message.channel.send('You need a reason!')
                console.log(`args1 = ${args[0]} args2 = ${args[1]}`)
                }
                else {
                    message.channel.bulkDelete(args[0]).then(() => {
                        console.log(args[0] + 'reason: ' + args[1])
                        const messageDeleted = new Discord.MessageEmbed()
                         .setTitle(`Deleted message/s`)
                         .addField('Messages deleted count',`${args[0]}`)
                         .addField('Reason', message.content.slice(args[0].length + prefix.length + command.length + 1))
                         .setFooter('message/s deleted by: ' + message.author.username)
                         .setColor(0x76448A);
                        message.channel.send(messageDeleted)
                    }) 
                    console.log(`args1 = ${args[0]} args2 = ${args[1]}`)
            }   }
        }
    } 

    const arg = message.content.slice(prefix.length).trim().split(/ +/);

    if (command === 'cmd') {
        const HelpEmbed = new Discord.MessageEmbed()
         .setTitle('Commands')
         .addField('Pictures','`adobo`, `hotdog`, `lansones`, `tinola`, `siopao`')
         .addField('Fun','`ping`, `lol`, `search`')
         .addField('Admins', '`say`, `kick`, `ban`, `newrole`, `clear`')
         .addField('Emotes', '`ship`, `dab`')
         .addField('Utility', '`invite`')
         .setFooter('note: make sure when using help cmd pls use "`help adobo"')
         .setColor(0x76448A);
        message.channel.send(HelpEmbed)
    }
    if (arg[0] === 'help') {
        if (args[0] === 'pictures' || args[0] === 'pics' || args[0] === 'pic') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle('Pictures')
            .setDescription('`adobo`, `hotdog`, `lansones`, `tinola`, `siopao`')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Admins' || args[0] === 'mod' || args[0] === 'mods') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle('Admins')
            .setDescription('`say`, `kick`, `ban`, `newrole`, `clear`')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Fun' || args[0] === 'happy' || args[0] === 'funny') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle('Fun')
            .setDescription('`ping`, `lol`, `search`')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Utility' || args[0] === 'Utilities' || args[0] === 'U') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle('Utility')
            .setDescription('`Invite`')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Emotes') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle('Emotes')
            .setDescription('`ship`, `dab`')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Adobo' || args[0] === 'manacc' || args[0] === 'sarap') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'adobo')
            .addField('Allies', 'adobopic')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'hotdog' || args[0] === 'uhtdog') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'hotdog')
            .addField('Allies', 'hotdogpic')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'lansones') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'lansones')
            .addField('Allies', 'NaN')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Tinola') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'Tinola')
            .addField('Allies', 'NaN')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'Siopao') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'siopao')
            .addField('Allies', 'siopaopics')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'say' || args[0] === 'said') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'say')
            .addField('Allies', 'NaN')
            .addField('Usage', 'command [words]')
            .addField('Permissions', 'Mod')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'kick' || args[0] === 'k') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'kick')
            .addField('Allies', 'k')
            .addField('Usage', 'command [mentionUser]')
            .addField('Permissions', 'Mod')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'ban' || args[0] === 'b') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'ban')
            .addField('Allies', 'b')
            .addField('Usage', 'command [mentionUser]')
            .addField('Permissions', 'Mod')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'newrole') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'newrole')
            .addField('Allies', 'NaN')
            .addField('Usage', 'command [role name]')
            .addField('Permissions', 'Mod')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'clear') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'clear')
            .addField('Allies', 'Delete')
            .addField('Usage', 'command [number to delete] [reason]')
            .addField('Permissions', 'Mod')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'ping' || args[1] === 'pong') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'ping')
            .addField('Allies', 'NaN')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'lol') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'lol')
            .addField('Allies', 'hahaha, laugh')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        } else if (args[0] === 'search' || args[1] === 'google') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'search')
            .addField('Allies', 'google')
            .addField('Usage', 'command [words]')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        }  else if (args[0] === 'ship') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'ship')
            .addField('Allies', 'likes')
            .addField('Usage', 'command [you want to ship]')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        }  else if (args[0] === 'dab') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'dab')
            .addField('Allies', 'nice')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        }  else if (args[0] === 'invite' || args[1] === 'inv') {
            const HelpPictures = new Discord.MessageEmbed()
            .setTitle(message.author.username)
            .addField('Command', 'invite')
            .addField('Allies', 'inv')
            .addField('Usage', 'command')
            .addField('Permissions', 'NaN')
            .setColor(0x76448A);
            message.channel.send(HelpPictures)
        }
    }
     // lansones
     function lansones(message){
 
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "Lansones Images",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };

        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }
     
     
            $ = cheerio.load(responseBody);
     
     
            var links = $(".image a.link");
     
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
           
            console.log(urls);
     
            if (!urls.length) {
               
                return;
            }     
            // Send result
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
        });
    };
     //tinola
     function tinola(message){
 
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "Tinola Images",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }
     
     
            $ = cheerio.load(responseBody);
     
     
            var links = $(".image a.link");
     
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
           
            console.log(urls);
     
            if (!urls.length) {
               
                return;
            }
     
            // Send result
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
        });
    };

    function alone(message){
 
        var options = {
            url: "http://results.dogpile.com/serp?qc=images&q=" + "your not alone",
            method: "GET",
            headers: {
                "Accept": "text/html",
                "User-Agent": "Chrome"
            }
        };
        request(options, function(error, response, responseBody) {
            if (error) {
                return;
            }
     
     
            $ = cheerio.load(responseBody);
     
     
            var links = $(".image a.link");
     
            var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
           
            console.log(urls);
     
            if (!urls.length) {
               
                return;
            }     
            // Send result
            message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
        });
    };
       
});

client.once('ready', () => {
    console.log('Bot is onlne');
    client.user.setActivity('Robloxian house | `cmd')
})

client.login(process.env.token)