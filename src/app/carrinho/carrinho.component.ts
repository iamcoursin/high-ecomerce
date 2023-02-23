import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
   itensCarrinho: IProdutoCarrinho[] = [];
   total = 0;

  constructor( public carrinhoService: CarrinhoService, private router: Router){   
  }
  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
    this.calcularTotal()
  }

  calcularTotal(){
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0)
  }

  removerProduto(produtoId: number){
    this.itensCarrinho = this.itensCarrinho.filter( item => item.id !== produtoId );
    this.carrinhoService.removerItem(produtoId)
    this.calcularTotal();
  }

  comprar(){
      alert('Parabéns, você finalizou a sua compra, nos siga em todas as nossas redes para mais ficar por dentro das nossas promoções! ');
      this.carrinhoService.limparCarrinho();
      this.router.navigate(['produtos']);
  }
}
