import { build, fake } from '@jackfranklin/test-data-bot'

const userBuilder = build('User', {
  fields: {
    email: fake((f) => f.internet.email()),
    password: fake((f) => f.internet.password()),
    full_name: fake((f) => f.name.findName())
  }
})

const restaurantBuilder = build('Restaurant', {
  fields: {
    name: fake((f) => f.name.findName())
  }
})

export {
  userBuilder,
  restaurantBuilder
}