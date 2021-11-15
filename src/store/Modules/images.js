import { imageCollection, storage } from '@/services/firebase'

import store from '../store'

const images = {
  namespaced: true,
  state: {
    image: {},
    images: [],
    msg: {},
  },
  mutations: {
    setImage (state, val) {
      state.image = val
    },
    setImages (state, val) {
      state.images = val
    },
    setMsg (state, val) {
      state.msg = val
    },
  },
  actions: {
    uploadImage ({ commit }, payload) {
      const file = payload.file
      const alt = payload.alt
      const storageRef = storage.ref('images/' + file.name)
      const uploadTask = storageRef.put(file)

      store.dispatch('global/setLoading', true)

      uploadTask.on(
        'state_changed',
        () => {
          // snapshot
        },
        () => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            imageCollection
              .add({
                name: file.name,
                createdOn: new Date(),
                url: downloadURL,
                alt: alt,
              })
              .then(doc => {
                const id = doc.id
                imageCollection
                  .doc(id)
                  .get()
                  .then(doc => {
                    const img = doc.data()
                    img.id = id
                    commit('setImage', img)
                  })
                  .then(() => {
                    store.dispatch('global/setLoading', false)
                    const msg = {
                      type: 'success',
                      message: 'Image sucssesfully uploaded to storage',
                    }
                    commit('setMsg', msg)
                    setTimeout(() => {
                      commit('setMsg', {})
                    }, 8000)
                  })
                  .catch(err => {
                    store.dispatch('global/setLoading', false)
                    const msg = {
                      type: 'warning',
                      message: err.message,
                    }
                    commit('setMsg', msg)
                    setTimeout(() => {
                      commit('setMsg', {})
                    }, 8000)
                  })
              })
              .catch(err => {
                store.dispatch('global/setLoading', false)
                const msg = {
                  type: 'warning',
                  message: err.message,
                }
                commit('setMsg', msg)
                setTimeout(() => {
                  commit('setMsg', {})
                }, 8000)
              })
          })
        },
      )
    },
    // eslint-disable-next-line no-empty-pattern
    singleUpload ({}, payload) {
      return new Promise((resolve, reject) => {
        const file = payload.file
        const alt = payload.alt
        const storageRef = storage.ref('images/' + file.name)
        const uploadTask = storageRef.put(file)

        uploadTask.on(
          'state_changed',
          () => {
            // snapshot
          },
          () => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              imageCollection
                .add({
                  name: file.name,
                  createdOn: new Date(),
                  url: downloadURL,
                  alt: alt,
                })
                .then(doc => {
                  const id = doc.id
                  imageCollection
                    .doc(id)
                    .get()
                    .then(doc => {
                      const img = doc.data()
                      img.id = id
                      resolve(img)
                    })
                    .catch(err => {
                      reject(err)
                    })
                })
                .catch(err => {
                  reject(err)
                })
            })
          },
        )
      })
    },
    multiUpload ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const storageRef = storage.ref('images/' + payload.name)
        const uploadTask = storageRef.put(payload)

        uploadTask.on(
          'state_changed',
          () => {
            // snapshot
          },
          () => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              imageCollection
                .add({
                  name: payload.name,
                  createdOn: new Date(),
                  url: downloadURL,
                  alt: payload.alt,
                })
                .then(doc => {
                  const id = doc.id
                  imageCollection
                    .doc(id)
                    .get()
                    .then(doc => {
                      const img = doc.data()
                      img.id = id
                      resolve(img)
                    })
                })
                .catch(err => {
                  const uploadMsg = {
                    type: 'warning',
                    message: err.message,
                  }
                  commit('setMsg', uploadMsg)
                  reject(err)
                })
            })
          },
        )
      })
    },
    setImages ({ commit }) {
      imageCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
        const imagesArray = []

        querySnapshot.forEach(doc => {
          const image = doc.data()
          image.id = doc.id
          imagesArray.push(image)
        })
        commit('setImages', imagesArray)
      })
    },
  },
  getters: {
    getImage (state) {
      return state.image
    },
    getImages (state) {
      return state.images
    },
    getMsg (state) {
      return state.msg
    },
  },
}

export default images
