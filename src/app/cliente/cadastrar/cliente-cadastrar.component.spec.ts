/**
 * Arquivo de teste do componente ClienteCadastrarComponent.
 *
 * @author Márcio Casale de Souza <contato@kazale.com>
 * @since 0.0.3
 */

import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import {
  RouterLinkStubDirective,
  ActivatedRouteStub,
  RouterStubService,
} from "../../";
import { ClienteCadastrarComponent } from "./";
import { ClienteService } from "../";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("ClienteCadastrar", () => {
  const CLIENTE_NOME = "Fulano";
  const URL_NAV = "/clientes";

  let fixture: ComponentFixture<ClienteCadastrarComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let clienteService: any;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ClienteCadastrarComponent, RouterLinkStubDirective],
      providers: [
        ClienteService,
        {
          provide: ActivatedRoute,
          useValue: new ActivatedRouteStub(),
        },
        {
          provide: Router,
          useValue: new RouterStubService(),
        },
      ],
    });

    fixture = TestBed.createComponent(ClienteCadastrarComponent);

    clienteService = TestBed.get(ClienteService);
    spyOn(clienteService, "cadastrar");

    router = TestBed.get(Router);
    spyOn(router, "navigate");
  });

  it("deve cadastrar um novo cliente", fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let nome = fixture.debugElement.query(By.css("#nome")).nativeElement;
    nome.value = CLIENTE_NOME;
    nome.dispatchEvent(new Event("input"));

    tick();
    fixture.detectChanges();

    let btnCadastrar = fixture.debugElement.query(By.css("button"));
    btnCadastrar.triggerEventHandler("click", null);

    let clienteCadastrar = clienteService.cadastrar.calls.argsFor(0)[0];

    expect(clienteService.cadastrar).toHaveBeenCalled();
    expect(clienteService.cadastrar).toHaveBeenCalledTimes(1);
    expect(clienteCadastrar.nome).toEqual(CLIENTE_NOME);

    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith([URL_NAV]);
  }));
});
