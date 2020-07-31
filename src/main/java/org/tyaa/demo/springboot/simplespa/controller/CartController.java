package org.tyaa.demo.springboot.simplespa.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.tyaa.demo.springboot.simplespa.model.Cart;
import org.tyaa.demo.springboot.simplespa.model.CartItem;
import org.tyaa.demo.springboot.simplespa.model.ResponseModel;
import org.tyaa.demo.springboot.simplespa.service.CartService;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService productService;

    @GetMapping("")
    public ResponseEntity<ResponseModel> getCartItems(HttpSession httpSession) {
        Cart cart = (Cart) httpSession.getAttribute("CART");
        if (cart == null) {
            cart = new Cart();
        }
        return new ResponseEntity<>(productService.getCartItems(cart), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ResponseModel> addCartItemCount(@PathVariable("id") Long id, HttpSession httpSession) {
        Cart cart = (Cart) httpSession.getAttribute("CART");
        if (cart == null) {
            cart = new Cart();
        }
        ResponseModel response =
            productService.changeCartItemCount(
                cart
                , id
                , CartItem.Action.ADD
            );
        httpSession.setAttribute("CART", cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseModel> subtractCartItemCount(@PathVariable("id") Long id, HttpSession httpSession) throws InstantiationException, IllegalAccessException {
        Cart cart = (Cart) httpSession.getAttribute("CART");
        if (cart == null) {
            cart = new Cart();
        }
        ResponseModel response =
            productService.changeCartItemCount(
                cart
                , id
                , CartItem.Action.SUB
            );
        httpSession.setAttribute("CART", cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ResponseModel> deleteCartItem(@PathVariable("id") Long id, HttpSession httpSession) {
        Cart cart = (Cart) httpSession.getAttribute("CART");
        if (cart == null) {
            cart = new Cart();
        }
        ResponseModel response =
            productService.changeCartItemCount(
                cart
                , id
                , CartItem.Action.REM
            );
        httpSession.setAttribute("CART", cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
