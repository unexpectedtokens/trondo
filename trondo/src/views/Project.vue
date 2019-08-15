 <template>
  <h4>This part of the website is under maintanance</h4>
  <!-- //   <div class="projectcontainer">
//     <h2>{{project.title}}</h2>
//     <div class="divider">
//       <div>
//         <h4>To do</h4>a
//         <ul @ondrop.prevent="drop(false, $event)" @dragover.prevent.stop @dragenter.stop.prevent>
//           <li v-for="(project,index) in uncompleted" :key="index">{{project}}</li>
//           <li class="newTodoContainer">
//             <div>
//               <input type="text" v-model="newTodo" placeholder="Add a new task to this project..." />
//               <button @click="addProjectTask" :disabled="checkIfEmpty">add</button>
//             </div>
//           </li>
//         </ul>
//       </div>
//       <div>
//         <h4>Done</h4>
//         <ul>
//           <li v-for="(project,index) in completed" :key="index">{{project}}</li>
//         </ul>
//       </div>
  <!-- //     </div>-->

  <!--</div> -->
</template>
<script>
// import axios from "axios";
// export default {
//   name: "Project",
//   data() {
//     return {
//       project: {},
//       newTodo: "",
//       uncompleted: [0, 1, 2],
//       completed: [1, 1, 2]
//     };
//   },
//   computed: {
//     // uncompleted() {
//     //   return [0, 0, 0];
//     // },
//     // completed() {
//     //   return [1, 1, 1];
//     // }
//     checkIfEmpty() {
//       return this.newTodo === "" ? "disabled" : false;
//     }
//   },
//   beforeMount() {
//     this.$store
//       .dispatch("getUserProjectTasks", this.$route.params.id)
//       .then(projects => {
//         const singleProject = projects.filter(
//           project => project._id === this.$route.params.id
//         );
//         this.project = singleProject[0];
//       });
//   },
//   methods: {
//     addProjectTask() {
//       this.$store
//         .dispatch("addProjectTodo", {
//           task: this.newTodo,
//           _id: this.$route.params.id
//         })
//         .then(() => {
//           this.$store.dispatch("getUserProjects");
//         });
//     }
//     // dragging(e) {
//     //   e.stopPropagation();
//     //   e.dataTransfer.setData("text", e.target.getAttribute("data-index"));
//     //   console.log(e);
//     // },
//     // drop(e) {
//     //   e.preventDefault();
//     //   e.stopPropagation();
//     //   console.log(e);
//     //   e.dataTransfer.getItem("text");
//     //     if (type) {
//     //       console.log(true);
//     //     } else {
//     //       console.log(false);
//     //     }
//     // }
//   }
// };
//
</script>


// 
// .projectcontainer {
//   width: 100%;
//   padding-top: 20px;
//   .divider {
//     margin-top: 50px;
//     display: grid;
//     grid-gap: 100px;
//     grid-template-columns: 1fr 1fr;
//     border-radius: 8px;
//     > div {
//       background: #eee;
//       padding: 10px;
//       border-radius: 8px;
//       box-shadow: 0px 0px 25px -3px #b5b5b5;
//       transition: all 0.3s;
//       h4 {
//         margin: 10px;
//       }
//       &:hover {
//         // transform: scale(0.99);
//         box-shadow: 0px 0px 15px -3px #b5b5b5;
//       }
//       ul {
//         background: #eee;
//         padding: 2px;
//         border-radius: 8px;

//         li {
//           list-style: none;
//           background: #fff;
//           margin: 5px;
//           padding: 10px;
//           border-radius: 2px;
//           cursor: pointer;
//           &.newTodoContainer {
//             padding: 0px 0px 3px;
//             div {
//               position: relative;
//               button {
//                 padding: 10px;
//                 background: #5fb5e8;
//                 color: #fff;
//                 border-radius: 15px;
//                 border: none;
//                 display: block;
//                 height: 30px;
//                 width: 50px;
//                 line-height: 0.5;
//                 margin: 5px;
//                 &:disabled {
//                   cursor: not-allowed;
//                   opacity: 0.7;
//                 }
//               }
//               input {
//                 width: 98%;
//                 height: 30px;
//                 transition: height 0.3s;
//                 text-indent: 5px;
//                 border: none;
//                 display: block;
//                 margin: 3px;
//                 cursor: pointer;
//                 &:focus {
//                   height: 70px;
//                   cursor: text;
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// </style>