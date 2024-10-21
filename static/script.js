function getFontSize() {
    if (window.innerWidth < 900) {
        return 10;
    }
    if (window.innerWidth < 1100) {
        return 12;
    }
    return 16;
}

const fitAddon = new FitAddon.FitAddon();
    const terminal = new Terminal({
        cursorBlink: true,
        fontFamily: 'JetBrains Mono, Courier New',
        fontSize: getFontSize(),
        theme: {
            background: '#141729',
            foreground: '#21B568',
            cursor: '#21B568'
        }
    });
    terminal.open(document.getElementById('terminal'));
    
    terminal.loadAddon(fitAddon);
    fitAddon.fit();

    // Helper function to wrap text without breaking words
    function writeWrappedText(term, text) {
        const cols = term.cols; // Get the number of columns in the terminal
        let currentLine = '';

        text.split(' ').forEach(word => {
            if ((currentLine + word).length > cols) {
                term.writeln(currentLine.trim()); // Write the line if it's full
                currentLine = word + ' '; // Start new line
            } else {
                currentLine += word + ' ';
            }
        });

        if (currentLine.length > 0) {
            term.writeln(currentLine.trim()); // Write the remaining text
        }
    }

    // Boot animation
    const services = [
        '  _______ _                   _ ',
        ' |__   __| |                 | |',
        '    | |  | |__   ___  ___  __| |',
        '    | |  | \'_ \\ / _ \\/ _ \\/ _` |',
        '    | |  | | | |  __/  __/ (_| |',
        '    |_|  |_| |_|\\___|\\___|\\__,_| .fr',
        '',
        'Par Johan Ledoux (https://johan.theed.fr)',
        '',
        '',
        'Démarrage du service réseau... [OK]',
        'Chargement du serveur web... [OK]',
        'Initialisation de la base de données... [OK]',
        'Lancement de la passerelle API... [OK]',
        'Montage du système de fichiers... [OK]',
        'Démarrage du service de sauvegarde... [OK]',
        'Initialisation des outils de surveillance... [OK]',
        'Lancement des modules de sécurité... [OK]',
        '...',
        'Lancement de docker... [OK]',
        'Lancement des machines virtuelles... [OK]',
        '...',
        'Démarrage terminé avec succès.'
    ];

    function getRandomDelay() {
        return Math.floor(Math.random() * 100) + 100;
    }

    let i = 0;
    function bootSequence() {
        if (i < services.length) {
            terminal.writeln(services[i]);
            i++;
            setTimeout(bootSequence, getRandomDelay());
        } else {
            setTimeout(() => {
                terminal.clear();
                showCommandPrompt();
            }, 1000);
        }
    }

    function showCommandPrompt() {
        terminal.writeln('Bienvenue dans l\'écosystème Theed !');
        terminal.writeln(`\r\n\x1b[1mUn écosystème de services centralisés !\x1b[0m`);
        writeWrappedText(terminal, `\rDerrière ce projet se trouve un passionné de technologie, déterminé à explorer et maîtriser l'infrastructure à grande échelle.`);
        writeWrappedText(terminal,`\rEn utilisant un NAS comme base, ce réseau de services a été développé pour offrir une solution complète, que ce soit pour le partage de fichiers, le gaming ou le contenu numérique, avec un accent sur l'efficacité, la simplicité et l'accessibilité. Ce projet reflète une volonté d'apprentissage constant et de partage des connaissances pour créer un environnement numérique plus connecté et performant.`);
        terminal.writeln('\nPour afficher les commandes disponibles, tapez "help".');
        terminal.writeln('Taper votre commande puis appuyez sur Entrée...\n');
        
        terminal.write('$ ');

        let command = '';

        terminal.onKey(e => {
            const char = e.key;

            if (e.domEvent.key === 'ArrowUp' || e.domEvent.key === 'ArrowDown') {
                e.preventDefault();
            }

            if (char === '\r') {
                processCommand(command);
                command = '';
            } else if (char === '\u007F') {
                if (command.length > 0) {
                    command = command.slice(0, -1);
                    terminal.write('\b \b');
                }
            } else {
                command += char;
                terminal.write(char);
            }
        });

        function processCommand(cmd) {
            const parts = cmd.trim().split(' ');
            const baseCommand = parts[0];
            const arg = parts[1];

            switch (baseCommand) {
                case 'help':
                    terminal.writeln('\r\nCommandes disponibles: johan, n8n, cdn, vault, server, play, credits, links, help, clear, exit');
                    break;

                case 'johan':
                    terminal.writeln(`\r\nOuverture du portfolio dans un nouvel onglet...`);
                    window.open('https://johan.theed.fr', '_blank');
                    break;
                
                case 'n8n':
                    terminal.writeln(`\r\nOuverture de n8n dans un nouvel onglet...`);
                    window.open('https://n8n.theed.fr', '_blank');
                    break;
                
                case 'cdn':
                    terminal.writeln(`\r\nOuverture du CDN dans un nouvel onglet...`);
                    window.open('https://cdn.theed.fr', '_blank');
                    break;
                
                case 'vault':
                    terminal.writeln(`\r\nOuverture de Vaultwarden dans un nouvel onglet...`);
                    window.open('https://vault.theed.fr', '_blank');
                    break;
                
                case 'server':
                    terminal.writeln(`\r\nOuverture du NAS dans un nouvel onglet...`);
                    window.open('https://nas.theed.fr', '_blank');
                    break;
                
                case 'play':
                    terminal.writeln(`\r\nServeur Minecraft : mc.theed.fr`);
                    terminal.writeln(`\rServeur Farming Simulator 2022 : hors ligne`);
                    break;
                
                case 'credits':
                    terminal.writeln(`\r\nOuverture des crédits dans un nouvel onglet...`);
                    window.open('/credits');
                    break;
                
                case 'links':
                    terminal.writeln(`\r\nOuverture des liens dans un nouvel onglet...`);
                    window.open('/links');
                    break;
                    
                
                case 'clear':
                    terminal.clear();
                    terminal.writeln('\rBienvenue dans l\'écosystème Theed !');
                    terminal.writeln(`\r\n\x1b[1mUn écosystème de services centralisés !\x1b[0m`);
                    writeWrappedText(terminal, `\rDerrière ce projet se trouve un passionné de technologie, déterminé à explorer et maîtriser l'infrastructure à grande échelle.`);
                    writeWrappedText(terminal,`\rEn utilisant un NAS comme base, ce réseau de services a été développé pour offrir une solution complète, que ce soit pour le partage de fichiers, le gaming ou le contenu numérique, avec un accent sur l'efficacité, la simplicité et l'accessibilité. Ce projet reflète une volonté d'apprentissage constant et de partage des connaissances pour créer un environnement numérique plus connecté et performant.`);
                    terminal.writeln('\nPour afficher les commandes disponibles, tapez "help".');
                    terminal.writeln('Taper votre commande puis appuyez sur Entrée...\n');
                    break;

                case 'exit':
                    terminal.clear();
                    terminal.writeln('\rFermeture de la session...');
                    setTimeout(() => {
                        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // Rickroll
                    }, 500);
                    keyListener.dispose();
                    terminal.setOption('cursorBlink', false);
                    terminal.writeln('\nSession terminée.');
                    break;

                default:
                    terminal.writeln(`\r\n${cmd}: commande introuvable`);
            }
            terminal.write('\n$ ');
        }
    }

    // Start boot sequence
    bootSequence();