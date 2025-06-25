sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
        onInit() {
            // Cria um objeto com os dados da View
            const oViewModel = new JSONModel({
                currency: "R$"
            });
            this.getView().setModel(oViewModel, "view");
        },

        // Dúvidas!
        onFilterInvoices(oEvent) {
            // Construção do array de busca
            const aFilter = [];
            const sQuery = oEvent.getParameter("query");

            if (sQuery) {
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }

            const oList = this.byId("invoiceList");
            const oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        }
    });
});
