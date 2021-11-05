import { createClient } from "contentful"
import Image from 'next/image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID , 
  accessToken: process.env.CONTENTFUL_ACCESS_KEY ,
})

export const getStaticPaths = async () => {
  const res = await client.getEntries({

    content_type : 'product'
  })
  const paths = res.items.map(item =>{
    return {
      params: {slug : item.fields.slug}
    }
  })
  return {
    paths,
    fallback : false
  }
}

export async function getStaticProps({ params }) {

    const { items } = await client.getEntries({
      content_type: 'product',
      'fields.slug': params.slug
    })

    return {
      props: { product: items[0] }
    }
}

export default function ProductDetails( {product} ) {
  const { featuredImage, title, price, description, details} = product.fields

  return (
    <div>
      <div className="banner">
        <Image 
          src = {'https:' + featuredImage.fields.file.url}
          width = {featuredImage.fields.file.details.image.width}
          height = {featuredImage.fields.file.details.image.height}
        />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p>Price: {price}</p>
        <h3>Description</h3>
        {description}
      </div>

      <div className="details">
        <h3>Details:</h3>
        <div>
          {documentToReactComponents(details) }
        </div>
      </div>

      <style jsx>{`
        h2,h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding: 20px;
          position: relative;
          top: -60px;
          left: -10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
        }
        
      `}</style>
    </div>
  )
}