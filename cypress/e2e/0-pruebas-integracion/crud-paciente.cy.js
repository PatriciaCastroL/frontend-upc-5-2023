/// <reference types="cypress" />

describe('CRUD Paciente', () => {

    //Antes que nada abrir el navegador en el proyecto Frontend que es el puerto 8100
    beforeEach(() => {
        cy.visit('http://localhost:8100') //Frontend de Produccion
            //cy.visit('http://localhost:8200')//Frontend de Test
    })

    //Servicio API - GetPaciente()
    it('GetPaciente()', () => {
        cy.wait(1000);
        //cy.get('ion-tab-button').should('be.not.visible');
        cy.get('ion-tab-button').eq(5).click(); // click en el TAB de Paciente
        cy.wait(1000);
        cy.get('ion-item').should('be.visible').should('not.have.length', '0'); //Verifica que exista un ion-item
    });

    //Servicio API - AddPaciente(entidad)
    it('AddPaciente(entidad)', () => {
        cy.get('ion-tab-button').eq(5).click(); // click en el TAB de Producto
        cy.wait(1000);

        cy.get('#nombrecompleto')
            .type('cypress', { delay: 100 })
            .should('have.value', 'cypress');
        cy.wait(500);
        cy.get('#cedulaidentidad').type('65478', { delay: 100 }).should('have.value', '65478');
        cy.wait(500);
        cy.get('#celular').type('67412', { delay: 100 }).should('have.value', '67412');
        cy.wait(500);
        cy.get('#agregarPaciente').not('[disabled]').click();
    });

    //Servicio API - UpdatePaciente(entidad)
    it('UpdatePaciente(entidad)', () => {
        cy.get('ion-tab-button').eq(5).click(); // click en el TAB de Producto
        cy.wait(1000);

        cy.get('#updatePaciente').eq(0).click(); //Click al boton de Editar un Producto
        cy.wait(1000);

        cy.get('#nombrecompleto').invoke('val', ''); //Vaciar el campo del textfield de nombreProducto
        cy.get('#nombrecompleto').type('update Cypress', { delay: 100 }); //Escribir "UPDATE Cypress en el textfield de nombreCategoria"
        cy.wait(500);

        cy.get('#cedulaidentidad').invoke('val', ''); //Vaciar el campo del textfield de idCategoriaProducto
        cy.get('#cedulaidentidad').type('857855', { delay: 100 }); //Escribir "UPDATE Cypress en el textfield de idCategoriaProducto"
        cy.wait(500);
        cy.get('#celular').invoke('val', ''); //Vaciar el campo del textfield de idCategoriaProducto
        cy.get('#celular').type('52147', { delay: 100 }); //Escribir "UPDATE Cypress en el textfield de idCategoriaProducto"
        cy.wait(500);


        cy.get('#guardarCambios').not('[disabled]').click(); //Click en guardar cambios
    });

    //Servicio API - DeletePaciente(id)
    it('DeletePaciente(id)', () => {
        cy.wait(1000);
        cy.get('ion-tab-button').eq(5).click(); // click en el TAB de Paciente

        cy.get('#deletePaciente').eq(0).click(); //Click al boton de Eliminar un Paciente
    });
});