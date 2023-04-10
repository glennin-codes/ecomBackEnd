const mongoose =  require('mongoose')
 const productSchema = new mongoose.Schema({
    name: {
      type: String,
      
    },
    company: {
      type: String, 
    },
    description: {
      type: String,
    
    },
    category: {
      type: String,
     
    },
    stock: {
      type: Number,
    },
    stars: {
      type: Number,

    },
    reviews: {
      type: Number,
      
    },
    price: {
      type: Number,
     
    },
    image: [
      {
        filename: {
          type: String,
          
        },
        url: {
          type: String,
       
        },
        product_id:{
            type:String,
        },
        thumbnailUrl:{
            type:String,
        }
      }
    ],
    colors: {
      type: [String],
    },
    user: {
      type: String,
    },
    featured:{
      type:Boolean,
      default:false
  
    },
    isClean:{  
      type:Boolean,
      default:false,
    },
    secondHand:{
        type:Boolean,
        default:false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
 


  });
  
  module.exports=mongoose.model('Products',productSchema);