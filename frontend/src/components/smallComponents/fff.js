import React from 'react'


const showQuantityFunctionality = () => {
    if(qyt === 0){
      return (<Button
        className="w-100 btn-block rounded text-capitalize"
      type="button" onClick={setQyt(qyt+1)}>
      Add to Cart
    </Button>)
    }
    if(qyt>0 && SingleProduct.countInStock){
      return(
      <>
        <Button
          className="w-100 btn-block rounded text-capitalize"
        type="button" onClick={setQyt(qyt+1)}>
        Add to Cart
      </Button>
        <p >Num</p>
        <Button
          className="w-100 btn-block rounded text-capitalize"
        type="button" onClick={setQyt(qyt+1)}>
        Add to Cart
      </Button>
      </>
      )
    };
}