webpackJsonp([1],{"9RkC":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Tqaz"),s=(a("sWs5"),a("7+uW")),r={render:function(){var t=this.$createElement;return(this._self._c||t)("router-view")},staticRenderFns:[]};var i=a("VU/8")({name:"App"},r,!1,function(t){a("9RkC")},null,null).exports,o=a("/ocq"),d=a("mtWM"),c=a.n(d),l={data:function(){return{component:"login",events:[],events_added:[],event_actual:{},show_cart:!0,add_new_event:!1,modify_new_event:!1,add_artist:!1,del_artist:!1,user:{username:"",total_tickets:0,available_money:0,logged:!1,is_admin:!1,token:""},addEventForm:{place:"",name:"",city:"",date:"",price:"",total_available_tickets:""}}},methods:{updateTotalQuant:function(){this.user.total_tickets=0;for(var t=0;t<this.events.length;t++)this.user.total_tickets+=this.events_added.tickets_bought},updateEventActual:function(t){for(var e=0;e<this.events.length;e++)this.events[e].id===t&&(this.event_actual=this.events[e])},login:function(){this.$router.replace({path:"/userlogin"})},logout:function(){this.user.logged=!1,this.$router.replace({path:"/",query:{logged:this.user.logged}})},getEvent:function(t){for(var e=0;e<this.events.length;e++)if(this.events[e].id===t)return this.events[e]},showCart:function(){this.show_cart=!1===this.show_cart},showAddEvent:function(){this.add_new_event=!1===this.add_new_event},showModifyEvent:function(){this.modify_new_event=!1===this.modify_new_event},showAddArtist:function(){this.add_artist=!1===this.add_artist},showDelArtist:function(){this.del_artist=!1===this.del_artist},incQuant:function(t){for(var e=!1,a=0;a<this.events_added.length;a++)this.events_added[a].event_id===t.id&&(this.events_added[a].tickets_bought+=1,e=!0);if(!e){var n={event_id:t.id,tickets_bought:1};this.events_added.push(n)}},decQuant:function(t){for(var e=0;e<this.events_added.length;e++)this.events_added[e].event_id===t.id&&(this.events_added[e].tickets_bought>1?this.events_added[e].tickets_bought-=1:this.events_added.splice(e,1))},deleteQuant:function(t){for(var e=0;e<this.events_added.length;e++)this.events_added[e].event_id===t.id&&this.events_added.splice(e,1)},finalizePurchase:function(){for(var t=0;t<this.events_added.length;t++){var e={id_event:this.events_added[t].id,tickets_bought:this.events_added[t].tickets_bought};this.addPurchase(e)}for(;this.events_added.length>0;)this.events_added.pop()},addPurchase:function(t){c.a.post("http://localhost:5000/order/"+this.user.username,t,{auth:{username:this.user.token}}).then(function(){alert("Order done")}).catch(function(t){console.log(t)})},onSumit:function(){this.$refs.addEventModal.hide();var t={place:this.addEventForm.place,name:this.addEventForm.name,city:this.addEventForm.city,date:this.addEventForm.date,price:this.addEventForm.price,total_available_tickets:this.addEventForm.total_available_tickets};this.addEvent(t),this.initForm()},addEvent:function(t){c.a.post("http://localhost:5000/event",t,{auth:{username:this.user.token}}).then(function(){alert("Event added")}).catch(function(t){alert("Problem has occurred"),console.log(t)})},initForm:function(){this.addEventForm.place="",this.addEventForm.name="",this.addEventForm.city="",this.addEventForm.date="",this.addEventForm.price="",this.addEventForm.total_available_tickets=""},resetParam:function(){this.initForm()},deleteEvent:function(){c.a.post("http://localhost:5000/event",{auth:{username:this.token}}).then(function(){alert("Event deleted")})},getEvents:function(){var t=this;c.a.get("http://localhost:5000/events").then(function(e){t.events=e.data.events}).catch(function(t){console.error(t)})}},created:function(){this.getEvents(),this.user.username=this.$route.query.username,this.user.logged=this.$route.query.logged,this.user.is_admin=this.$route.query.is_admin,this.user.token=this.$route.query.token}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("nav",{staticClass:"navbar navbar-dark"},[a("h2",{staticStyle:{color:"#d3d9df"}},[t._v("FestiFinder")]),t._v(" "),t.user.logged?a("div",{attrs:{id:"navbarLogged"}},[a("div",{staticClass:"navbar-nav",staticStyle:{position:"absolute",left:"60%"}},[a("div",{staticClass:"nav-item",staticStyle:{color:"white"},attrs:{text:t.user.username}})]),t._v(" "),a("div",{staticClass:"navbar-nav",staticStyle:{position:"absolute",left:"70%"}},[a("div",{staticClass:"navbar-text",staticStyle:{color:"white"},attrs:{text:"Tickets bought: "+t.user.total_tickets}}),t._v(" "),a("div",{staticClass:"nav-item",attrs:{text:"Money available: "+t.user.available_money}})]),t._v(" "),a("button",{staticClass:"btn btn-outline-light floated",on:{click:t.showCart}},[t._v(" Cart 🛒")]),t._v(" "),a("button",{staticClass:"btn btn-outline-light floated",on:{click:t.logout}},[t._v(" Logout ")])]):a("div",[a("div",{staticClass:"navbar-nav"},[a("button",{staticClass:"btn btn-outline-light",on:{click:t.login}},[t._v(" Login ")])])])]),a("br"),a("br"),t._v(" "),t.show_cart?[a("thead",[t._m(0),t._v(" "),t._l(t.events_added,function(e){return a("tr",{directives:[{name:"onfocus",rawName:"v-onfocus",value:t.updateEventActual(e.event_id),expression:"updateEventActual(event.event_id) "}],key:e.event_id},[a("td",[t._v(t._s(t.event_actual.name))]),t._v(" "),a("td",[t._v("\n          "+t._s(e.tickets_bought)+"\n          "),a("button",{staticClass:"btn b-icon btn-sm",on:{click:function(a){t.decQuant(t.getEvent(e.event_id))}}},[t._v("-")]),t._v(" "),a("button",{staticClass:"btn b-icon btn-sm",on:{click:function(a){t.incQuant(t.getEvent(e.event_id))}}},[t._v("+")])]),t._v(" "),a("td",[t._v(t._s(t.event_actual.price))]),t._v(" "),a("td",[t._v(t._s(t.event_actual.price*e.tickets_bought))]),t._v(" "),a("button",{staticClass:"btn btn-success",on:{click:function(a){t.deleteQuant(t.getEvent(e.event_id))}}},[t._v("Delete ticket")])])}),t._v(" "),a("button",{staticClass:"btn btn-success btn-lg",on:{click:t.showCart}},[t._v("Back")]),t._v(" "),a("button",{staticClass:"btn btn-success btn-lg",on:{click:t.finalizePurchase}},[t._v("Finalize purchase")])],2)]:t.add_new_event?[a("b-card",{staticStyle:{width:"250px",margin:"auto"}},[a("h3",[t._v(" Add new event")]),t._v(" "),a("button",{staticClass:"btn btn-outline-dark btn-sm",staticStyle:{"margin-block-end":"10px",position:"absolute",top:"0",right:"0"},on:{click:function(e){t.add_new_event=!1}}},[t._v("x")]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{staticStyle:{"margin-left":"fill"},attrs:{for:"inputName"}},[t._v("Name:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.name,expression:"addEventForm.name"}],attrs:{type:"username",id:"inputName",placeholder:"Enter event name",required:"",autofocus:""},domProps:{value:t.addEventForm.name},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"name",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputPrice"}},[t._v("Price:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.price,expression:"addEventForm.price"}],attrs:{type:"username",id:"inputPrice",placeholder:"Enter price",required:"",autofocus:""},domProps:{value:t.addEventForm.price},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"price",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputDate"}},[t._v("Date:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.date,expression:"addEventForm.date"}],attrs:{type:"username",id:"inputDate",placeholder:"Enter date",required:"",autofocus:""},domProps:{value:t.addEventForm.date},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"date",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputCity"}},[t._v("City:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.city,expression:"addEventForm.city"}],attrs:{type:"username",id:"inputCity",placeholder:"Enter city",required:"",autofocus:""},domProps:{value:t.addEventForm.city},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"city",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputPlace"}},[t._v("Place:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.place,expression:"addEventForm.place"}],attrs:{type:"username",id:"inputPlace",placeholder:"Enter place",required:"",autofocus:""},domProps:{value:t.addEventForm.place},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"place",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputTickets"}},[t._v("Tickets:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.total_available_tickets,expression:"addEventForm.total_available_tickets"}],attrs:{type:"username",id:"inputTickets",placeholder:"Enter ticket",required:"",autofocus:""},domProps:{value:t.addEventForm.total_available_tickets},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"total_available_tickets",e.target.value)}}})]),t._v(" "),a("br"),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(e){return e.preventDefault(),t.onSumit(e)}}},[t._v("Submit")]),t._v(" "),a("button",{staticClass:"btn btn-danger",on:{click:t.resetParam}},[t._v("Reset")])])]:t.modify_new_event?[a("b-card",{staticStyle:{width:"250px",margin:"auto"}},[a("h3",[t._v(" Add new event")]),t._v(" "),a("button",{staticClass:"btn btn-outline-dark btn-sm",staticStyle:{"margin-block-end":"10px",position:"absolute",top:"0",right:"0"},on:{click:function(e){t.add_new_event=!1}}},[t._v("x")]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{staticStyle:{"margin-left":"fill"},attrs:{for:"inputName"}},[t._v("Name:")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.name,expression:"addEventForm.name"}],attrs:{type:"username",id:"inputName",placeholder:"Enter event name",required:"",autofocus:""},domProps:{value:t.addEventForm.name},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"name",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputPrice"}},[t._v("Price:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.price,expression:"addEventForm.price"}],attrs:{type:"username",id:"inputPrice",placeholder:"Enter price",required:"",autofocus:""},domProps:{value:t.addEventForm.price},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"price",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputDate"}},[t._v("Date:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.date,expression:"addEventForm.date"}],attrs:{type:"username",id:"inputDate",placeholder:"Enter date",required:"",autofocus:""},domProps:{value:t.addEventForm.date},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"date",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputCity"}},[t._v("City:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.city,expression:"addEventForm.city"}],attrs:{type:"username",id:"inputCity",placeholder:"Enter city",required:"",autofocus:""},domProps:{value:t.addEventForm.city},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"city",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputPlace"}},[t._v("Place:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.place,expression:"addEventForm.place"}],attrs:{type:"username",id:"inputPlace",placeholder:"Enter place",required:"",autofocus:""},domProps:{value:t.addEventForm.place},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"place",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputTickets"}},[t._v("Tickets:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addEventForm.total_available_tickets,expression:"addEventForm.total_available_tickets"}],attrs:{type:"username",id:"inputTickets",placeholder:"Enter ticket",required:"",autofocus:""},domProps:{value:t.addEventForm.total_available_tickets},on:{input:function(e){e.target.composing||t.$set(t.addEventForm,"total_available_tickets",e.target.value)}}})]),t._v(" "),a("br"),t._v(" "),a("button",{staticClass:"btn btn-primary",on:{click:function(e){return e.preventDefault(),t.onSumit(e)}}},[t._v("Submit")]),t._v(" "),a("button",{staticClass:"btn btn-danger",on:{click:t.resetParam}},[t._v("Reset")])])]:[t.user.logged?a("div",[a("button",{staticClass:"btn btn-dark",staticStyle:{"margin-bottom":"0"},on:{click:t.showAddEvent}},[t._v(" Add new event ")]),a("br"),a("br"),t._v(" "),a("button",{staticClass:"btn btn-outline-dark",on:{click:t.showModifyEvent}},[t._v(" Modify event ")]),a("br"),a("br")]):t._e(),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"row"},t._l(t.events,function(e){return a("div",{key:e.id,staticClass:"col-lg-4 col-md-6 mb-4"},[a("br"),t._v(" "),a("div",{staticClass:"card",staticStyle:{width:"18rem","border-radius":"3%","background-color":"#9fcdff"}},[a("div",{staticClass:"card-body"},[a("img",{attrs:{src:e.image,height:"200",width:"250",alt:"Card image cap"}}),t._v(" "),a("h4",{staticClass:"card-title"},[t._v(t._s(e.name))]),t._v(" "),a("p",{staticClass:"card-text"},[t._v(t._s(e.city))]),t._v(" "),a("p",{staticClass:"card-text"},[t._v(t._s(e.place))]),t._v(" "),a("p",{staticClass:"card-text"},[t._v(t._s(e.date))]),t._v(" "),a("p",{staticClass:"card-text"},[t._v(t._s(e.price)+" €")]),t._v(" "),a("p",{staticClass:"card-text"},[t._v("Tickets left: "+t._s(e.total_available_tickets)+" ")]),t._v(" "),t.user.logged?a("button",{staticClass:"btn btn-success",staticStyle:{"margin-bottom":"10px"},on:{click:function(a){return t.incQuant(e)}}},[t._v("Add to cart")]):t._e(),a("br"),t._v(" "),t.user.logged?a("button",{staticClass:"btn btn-secondary",staticStyle:{"margin-bottom":"10px"},on:{click:function(a){return t.showAddArtist(e)}}},[t._v("Add artist")]):t._e(),a("br"),t._v(" "),t.user.logged?a("button",{staticClass:"btn btn-secondary",staticStyle:{"margin-bottom":"10px"},on:{click:function(a){return t.showDelArtist(e)}}},[t._v("Delete artist")]):t._e(),a("br"),t._v(" "),t.user.logged?a("button",{staticClass:"btn btn-danger",staticStyle:{"margin-bottom":"10px"},on:{click:function(a){return t.deleteEvent(e)}}},[t._v("Delete event")]):t._e(),a("br")])])])}),0)])]],2)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("th",[this._v("Event Name")]),this._v(" "),e("th",[this._v("Quantity")]),this._v(" "),e("th",[this._v("Price(€)")]),this._v(" "),e("th",[this._v("Total")])])}]};var v=a("VU/8")(l,u,!1,function(t){a("zknW")},null,null).exports,m={data:function(){return{create_account:!1,user:{username:"",password:"",is_admin:0,token:"",logged:!1},addUserForm:{username:"",password:""}}},methods:{initForm:function(){this.addUserForm.username="",this.addUserForm.password=""},resetParam:function(){this.initForm()},checkLogin:function(){var t=this,e={username:this.user.username,password:this.user.password};c.a.post("http://localhost:5000/login",e).then(function(e){t.user.logged=!0,t.user.token=e.data.token,t.getAccount(),alert("Logged in as "+t.user.username),t.$router.replace({path:"/",query:{username:t.user.username,logged:t.user.logged,is_admin:t.user.is_admin,token:t.user.token}})}).catch(function(e){console.error(e),t.user.username="",alert("Username or Password incorrect")})},getAccount:function(){var t=this;c.a.get("http://localhost:5000/account/"+this.user.username).then(function(e){t.user.is_admin=e.data.is_admin}).catch(function(t){console.error(t)})},onSumit:function(){var t=this,e={username:this.addUserForm.username,password:this.addUserForm.password,is_admin:0,available_money:500};c.a.post("http://localhost:5000/account/"+e.username,e).then(function(e){alert("Account created!"),t.initForm(),t.$router.replace({path:"/"})}).catch(function(a){console.error(a),t.user.username="",alert("Username "+e.username+" already exists")})},backToEvents:function(){this.user.logged=!1,this.$router.replace({path:"/",query:{logged:this.user.logged}})}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[t.create_account?t._e():[a("h1",[t._v(" Sing in")]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputUsername"}},[t._v("Username:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.username,expression:"user.username"}],attrs:{type:"username",id:"inputUsername",placeholder:"Username",required:"",autofocus:""},domProps:{value:t.user.username},on:{input:function(e){e.target.composing||t.$set(t.user,"username",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputPassword"}},[t._v("Password:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticStyle:{"margin-block-end":"10px"},attrs:{type:"password",id:"inputPassword",placeholder:"Password",required:""},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn btn-primary",staticStyle:{"margin-block-end":"10px",width:"300px"},on:{click:t.checkLogin}},[t._v("SING IN")]),a("br"),t._v(" "),a("button",{staticClass:"btn btn-success",staticStyle:{"margin-block-end":"10px",width:"300px"},on:{click:function(e){t.create_account=!0}}},[t._v("CREATE ACCOUNT")]),a("br"),t._v(" "),a("button",{staticClass:"btn",staticStyle:{"margin-block-end":"10px",width:"300px"},on:{click:t.backToEvents}},[t._v("BACK TO EVENTS")]),a("br")],t._v(" "),t.create_account?[a("h3",[t._v(" Create account")]),t._v(" "),a("button",{staticClass:"btn btn-outline-dark btn-sm",staticStyle:{"margin-block-end":"10px",position:"absolute",top:"0",right:"0"},on:{click:function(e){t.create_account=!1}}},[t._v("x")]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputUsername"}},[t._v("Username:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addUserForm.username,expression:"addUserForm.username"}],attrs:{type:"username",id:"inputUsernameCreate",placeholder:"Username",required:"",autofocus:""},domProps:{value:t.addUserForm.username},on:{input:function(e){e.target.composing||t.$set(t.addUserForm,"username",e.target.value)}}})]),t._v(" "),a("div",{staticClass:"form-label-group"},[a("label",{attrs:{for:"inputPassword"}},[t._v("Password:")]),a("br"),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.addUserForm.password,expression:"addUserForm.password"}],staticStyle:{"margin-block-end":"10px"},attrs:{type:"password",id:"inputPasswordCreate",placeholder:"Password",required:""},domProps:{value:t.addUserForm.password},on:{input:function(e){e.target.composing||t.$set(t.addUserForm,"password",e.target.value)}}})]),t._v(" "),a("button",{staticClass:"btn btn-primary",staticStyle:{"margin-block-end":"10px",width:"300px"},on:{click:t.onSumit}},[t._v("Submit")]),t._v(" "),a("button",{staticClass:"btn btn-danger",staticStyle:{"margin-block-end":"10px",width:"300px"},on:{click:t.resetParam}},[t._v("Reset")])]:t._e()],2)},staticRenderFns:[]};var _=a("VU/8")(m,p,!1,function(t){a("jFjZ")},null,null).exports;s.default.use(o.a);var h=new o.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:[{path:"/",name:"login",component:v},{path:"/userlogin",name:"Login",component:_}]});s.default.use(n.a),s.default.config.productionTip=!1,new s.default({router:h,render:function(t){return t(i)}}).$mount("#app")},jFjZ:function(t,e){},sWs5:function(t,e){},zknW:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.c3c2958566f03a5a3338.js.map