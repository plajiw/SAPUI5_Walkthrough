sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.HelloPanel", {
        onShowHello() {

            // Obtém o Resource Bundle do modelo 'i18n' para poder ler os textos traduzidos
            // A cadeia de ações é:
            // 1. this.getView(): Pega a instância desta View (HelloPanel.view.xml)
            // 2. .getModel("i18n"): Acessa o modelo de internacionalização que foi anexado à View (geralmente via manifest.json)
            // 3. .getResourceBundle(): Extrai o objeto que sabe como ler os textos do arquivo de propriedades
            const oBundle = this.getView().getModel("i18n").getResourceBundle();

            // Do modelo de dados obtém o valor da propriedade /recipient/name
            const sRecipient = this.getView().getModel().getProperty("/recipient/name");
            
            // Usando o Resource Bundle, busca o texto com a chave "helloMsg" e substitui o marcador {0} pelo nome do destinatário
            const sMsg = oBundle.getText("helloMsg", [sRecipient]);

            // Exibe a mensagem formatada em um "toast"
            MessageToast.show(sMsg);
        },

        async onOpenDialog() {
            // Carrega o Fragmento do diálogo de forma "preguiçosa" (lazy loading)
            // O operador '??=' garante que o fragmento seja carregado (await this.loadFragment) APENAS na primeira vez
            // Nas vezes seguintes, this.oDialog já terá um valor, e o código à direita não será executado
            this.oDialog ??= await this.loadFragment({
                name: "ui5.walkthrough.view.HelloDialog"
            });
        
            // Abre o diálogo que agora está garantido de existir em this.oDialog.
            this.oDialog.open();
        },

        onCloseDialog()
        {
            this.oDialog.close();
        }
    });
});
