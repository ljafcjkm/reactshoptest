import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Context from './context'
import Header from './components/header'
import Footer from './components/footer'
import Modal from './components/modal'
import DevInfo from './devinfo'
import {Home} from './pages/home'
import {Info} from './pages/info'
import {products} from './data/products'

function App() {
  const [prods, setProds] = useState(JSON.parse(products))
  const [cart, setCart] = useState([])
  const [modal, setModal] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    setProds(prods.map(prod=>{ 
      return Object.assign(prod,{incart: '0'})
    }))
    setCategories(()=>{
      const catsSet = new Set();
      prods.forEach(prod => {
        prod.cat[0] && catsSet.add(prod.cat[0])
      });
      return Array.from(catsSet)
    })
  },[])

  // useEffect(()=>{
  //   console.log(Array.from(categories))
  //   console.log(categories)
  // },[cart])

  // useEffect(()=>{
  //   setCart( prods.filter(item => item.incart > 0 ))
  // },[prods])

  function addToCart(prod){
    // setCart([...cart, prod])
    // setCart(()=>{
    //   return cart.concat(prod)
    // })
    setProds(prods.map(item => {
      if(item.id === prod.id){
        item.incart++
      }
      return item
    }))

    setCart( prods.filter(i => i.incart > 0 ))
  }

  // function removeFromCart(id){
  //   console.log(id)
  //   setCart(()=>{
  //     return cart.filter( (item,i) => i !== id )
  //   })
  // }

  function removeFromCart(id){
    setProds(prods.map(item => {
      if(item.id === id && item.incart > 0){
        item.incart--
      }
      return item
    }))
    setCart( prods.filter(i => i.incart > 0 ))
  }

  useEffect(()=>{
    if(modal){
      document.body.classList.add('modal-open')
    }else{
      document.body.classList.remove('modal-open')
    }
  },[modal])

  function openModal(){
    setModal(true)
  }

  function closeModal(){
    setModal(false)
  }

  function filterProducts(cat = 'all'){
    setProds(prods.map(prod=>{ 
      if(cat !== 'all' && prod.cat[0] && prod.cat[0] !== cat){
        return Object.assign(prod,{filter: true})
      }else{
        return Object.assign(prod,{filter: false})
      }
      
    }))
  }


  return (
    <Context.Provider value={{prods, cart, categories, addToCart, removeFromCart, filterProducts, openModal, closeModal}}>
      <BrowserRouter>
        
          <Header/>
          <Switch>
            <Route path={'/'} exact component={Home} />
            <Route path={'/information'} component={Info} />
          </Switch>
          <Footer/>
          {/* <DevInfo/> */}

          {modal && <Modal/>}
        
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
