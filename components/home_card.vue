<template>
  <div class="d-flex justify-center flex-wrap px-5 pt-1 mx-0" width="100%">
    <v-card
      v-for="n in 30"
      :key="n"
      class="overflow-hidden mx-2 my-2"
      width="250px"
      height="250px"
      elevation="2"
      color="#FFEE58"
      @click="algo"
    >
      <v-card-title class="d-inline-block subtitle-1 text-truncate pt-3 pb-0" style="max-width: 250px; color: #000">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut dolorem, natus itaque provident tenetur molestias rerum iure doloribus laborum ad beatae accusantium fugiat, impedit, quibusdam recusandae quis unde qui illum.
      </v-card-title>
      <v-card-text class="caption" style="max-width: 250px; color: #000">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio magni recusandae, quam cumque molestiae nobis laboriosam labore temporibus voluptatum! Cumque hic illum sunt illo nulla laborum, exercitationem provident id quaerat dolores esse, ab odio inventore? Magnam, dicta! Illum, ratione aliquam totam vel natus excepturi quam ea provident minus corrupti quidem perferendis velit quasi quo ipsa molestias numquam beatae ut vero distinctio voluptate atque sequi soluta. Repellendus beatae unde praesentium possimus aliquid autem nobis necessitatibus, eveniet enim assumenda blanditiis facere! Quidem vitae debitis maiores vero autem repudiandae, fugit excepturi iure? Aperiam officia sapiente tempora assumenda enim deserunt soluta a, dolorem alias? Velit rerum unde omnis, doloribus, ipsam perferendis eos quam ipsum consequuntur qui at hic iste obcaecati dignissimos, a veritatis sed? Animi, culpa ea eos veniam officia laudantium optio quis labore sed dolore voluptas, repudiandae praesentium rerum nostrum. Aperiam soluta eveniet sint, architecto recusandae nihil mollitia, veritatis enim suscipit molestiae ad reprehenderit dicta nemo excepturi sunt obcaecati nisi culpa ut in est debitis impedit accusantium! Hic laboriosam assumenda ex quo velit aut obcaecati, dicta nesciunt accusamus quos architecto facere numquam dolorum, molestiae sapiente molestias et eveniet quaerat nam, quam voluptate id optio! Ex, omnis quaerat! Rerum eligendi quod molestiae illo natus ullam voluptatem totam? Et est ex nisi sit recusandae eaque veritatis ipsum error molestias! Suscipit, nesciunt cumque ea quis est natus similique esse a velit? Hic sint perferendis et sed iusto porro alias maxime ipsa, tenetur laboriosam aliquid dolorem. Reprehenderit consectetur aspernatur aliquid assumenda, exercitationem nisi magnam deserunt maiores facilis iusto blanditiis possimus delectus officia, cumque sed voluptatem est eius quos? Veniam totam facere doloribus labore, accusantium ipsum tempora perspiciatis suscipit, corrupti molestiae officia corporis cum modi aut? Incidunt, eligendi at pariatur labore aliquam laboriosam necessitatibus veniam nisi! Quis soluta iusto ex voluptates illum! In eum blanditiis vitae nisi fugiat accusantium modi eaque saepe unde iure perspiciatis dolores fugit, obcaecati nesciunt! Fugiat ipsam vero possimus accusantium inventore incidunt quod delectus, qui quo in placeat quam deleniti fugit doloremque voluptatibus perspiciatis et totam repellendus! Expedita omnis alias laborum eos dolorum exercitationem voluptatum fuga amet eius rerum quisquam perspiciatis enim repellat nobis iusto praesentium illum illo, placeat quidem, blanditiis nesciunt nihil. Perferendis esse distinctio vel? Sint quisquam earum culpa nobis consectetur maxime hic facilis, aliquam perspiciatis doloremque quo aut similique quod illo eveniet laborum necessitatibus magni libero doloribus, nihil, mollitia id quibusdam esse! Officiis hic aspernatur modi repellendus at labore adipisci harum quisquam impedit sed numquam, accusantium ab dolor necessitatibus sit consequuntur. Deleniti optio doloribus commodi neque laboriosam fugiat reiciendis quidem aliquam ipsam atque architecto explicabo magnam debitis dignissimos dolore perspiciatis rerum accusamus, nesciunt quibusdam aliquid sint! Possimus tenetur esse ut facilis voluptates blanditiis, consectetur sunt, fugit animi natus, laudantium labore exercitationem quibusdam beatae quas veniam error! Magnam debitis ratione aspernatur esse eius suscipit earum ullam explicabo, sequi soluta. Voluptas, sit ad. Neque, unde. Nobis, magnam recusandae! Nulla aspernatur voluptates delectus eius corrupti nisi! Alias quia porro nemo nisi labore veniam reprehenderit possimus ullam officia? Explicabo numquam repellendus natus quibusdam, nobis ab?
      </v-card-text>
    </v-card>
    <v-btn
      fab
      right
      bottom
      absolute
      fixed
      color="green"
      width="70px"
      height="70px"
      class="mr-10 mb-16"
    >
      <v-icon class="display-3">
        mdi-plus
      </v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  data () {

  },
  created () {
    this.loadNotes()
  },
  methods: {
    algo () {
    },
    async loadNotes () {
      await this.$axios.get('/note')
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res)
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error)
        })
    }
  }
}

</script>
