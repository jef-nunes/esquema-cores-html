interface ColorSchemeInit
{
    // Referência para o documento / página HTML
    // para usar a lógica do esquema de cores
    documentRef: Document,

    // Nome dos arquivos CSS para os esquemas claro e escuro
    lightCSS: string,
    darkCSS: string,

    // Define o esquema padrão
    // passando os valores em string
    // "dark" ou "light"
    defaultScheme: string,

    // Referência para o botão para alternar entre os esquemas
    schemeButton: HTMLButtonElement
}

interface UseScheme {
    skipToggle: boolean
}

class ColorScheme
{
    // O modo escuro é o esquema atual?
    private isDarkMode: boolean;
    // Referência para o documento
    private documentRef: Document;
    // CSS para o esquema claro
    private lightCSS: HTMLLinkElement;
    // CSS para o esquema escuro
    private darkCSS: HTMLLinkElement;
    // Qual esquema é o padrão
    private defaultScheme: string;
    // Botão para alternar o esquema
    private schemeButton: HTMLButtonElement;

    constructor(args: ColorSchemeInit) {
        if (!args) {
            throw new Error("ColorSchemeInit é obrigatório");
        }
    
        this.documentRef = args.documentRef;
    
        const lightLink = this.documentRef.getElementById(args.lightCSS);
        const darkLink = this.documentRef.getElementById(args.darkCSS);
    
        if (!lightLink || !darkLink) {
            throw new Error("Elementos CSS não encontrados");
        }
    
        this.lightCSS = lightLink as HTMLLinkElement;
        this.darkCSS = darkLink as HTMLLinkElement;
        this.defaultScheme = args.defaultScheme;
        this.schemeButton = args.schemeButton;
        this.isDarkMode = (this.defaultScheme === "dark");
        this.useScheme({ skipToggle: true });
    }

    private useScheme(args: UseScheme) {
        if (!args.skipToggle) {
            this.isDarkMode = !this.isDarkMode;
        }

        if (this.isDarkMode) {
            this.lightCSS.disabled = true;
            this.darkCSS.disabled = false;
        } else {
            this.lightCSS.disabled = false;
            this.darkCSS.disabled = true;
        }
    }
    
    // Tenta usar o tema do navegador
    public useBrowserTheme(windowRef: Window) {
        const browserDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (browserDarkMode) {
            this.isDarkMode = true;
        } else {
            this.isDarkMode = false;
        }
        this.useScheme({ skipToggle: true });
    }
}
