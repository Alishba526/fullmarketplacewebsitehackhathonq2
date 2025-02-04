import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId,token } from '../env'

export const client = createClient({
  token,
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
// filepath: /c:/Users/alishba/Documents/alishba-master/alishba-master/src/sanityClient.js
