<template>
    <div>
      <h2>Produk</h2>
 <form @submit.prevent="save">
  <div class="form-group">
    <label>Produk</label>
    <input type="text" v-model="pijarcamp.nama_produk" class="form-control"  placeholder="Nama Produk">

  </div>
  <div class="form-group">
    <label>Keterangan</label>
    <input type="text" v-model="pijarcamp.keterangan" class="form-control"  placeholder="Keterangan">

  </div>

  <div class="form-group">
    <label>Harga</label>
    <input type="text" v-model="pijarcamp.harga" class="form-control"  placeholder="Harga">

  </div>

  <div class="form-group">
    <label>Jumlah</label>
    <input type="text" v-model="pijarcamp.jumlah" class="form-control"  placeholder="Jumlah">

  </div>

  <button type="submit" class="btn btn-primary">Save</button>
</form>

      <h2>Produk</h2>
      <table class="table table-dark">
  <thead>
    <tr>
      <!-- <th scope="col">ID</th> -->
      <th scope="col">Nama Produk</th>
      <th scope="col">Keterangan</th>
      <th scope="col">Harga</th>
      <th scope="col">Jumlah</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="pijarcamp in result" v-bind:key="pijarcamp._id">

          <!-- <td>{{ pijarcamp._id }}</td> -->
          <td>{{ pijarcamp.nama_produk }}</td>
          <td>{{ pijarcamp.keterangan }}</td>
          <td>Rp.{{ pijarcamp.harga }}</td>
          <td>{{ pijarcamp.jumlah }}</td>
          <td>
            <button type="button" class="btn btn-warning" @click="edit(pijarcamp)">Edit</button>
            <button type="button" class="btn btn-danger"  @click="remove(pijarcamp)">Delete</button>
          </td>
        </tr>

  </tbody>
</table>

    </div>
  </template>

<script>
import Vue from 'vue'
import axios from 'axios'

Vue.use(axios)

export default {
  data () {
    return {
      result: {},
      pijarcamp: {
        _id: '',
        nama_produk: '',
        keterangan: '',
        harga: '',
        jumlah: ''

      }
    }
  },
  created () {
    this.PijarcampLoad()
  },
  mounted () {
    console.log('mounted() called.......')
  },

  methods: {
    PijarcampLoad () {
      var page = 'http://localhost:8000/user/getAll'
      axios.get(page)
        .then(
          ({data}) => {
            console.log(data)
            this.result = data.data
          }
        )
    },

    save () {
      // eslint-disable-next-line eqeqeq
      if (this.pijarcamp._id == '') {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    saveData () {
      axios.post('http://localhost:8000/user/create', this.pijarcamp)
        .then(
          ({data}) => {
            alert('berhasil input data')
            this.PijarcampLoad()
          }
        )
    },
    edit (pijarcamp) {
      this.pijarcamp = pijarcamp
    },
    updateData () {
      var editrecords = 'http://localhost:8000/user/update/' + this.pijarcamp._id
      axios.patch(editrecords, this.pijarcamp)
        .then(
          ({data}) => {
            // eslint-disable-next-line no-unused-expressions, no-sequences
            this.pijarcamp.nama_produk = '',
            this.pijarcamp.keterangan = '',
            this.pijarcamp.harga = '',
            this.pijarcamp.jumlah = '',
            this.id = ''
            alert('berhasil edit')
            this.PijarcampLoad()
          }
        )
    },

    remove (pijarcamp) {
      var url = `http://localhost:8000/user/delete/${pijarcamp._id}`
      axios.delete(url)
      alert('hapus data')
      this.PijarcampLoad()
    }
  }
}
</script>
