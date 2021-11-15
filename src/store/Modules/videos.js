import { videoCollection, storage } from '@/services/firebase'

import store from '../store'

const videos = {
  namespaced: true,
  state: {
    video: {},
    videos: [],
    msg: {},
  },
  mutations: {
    setVideo (state, val) {
      state.video = val
    },
    setVideos (state, val) {
      state.videos = val
    },
    setMsg (state, val) {
      state.msg = val
    },
  },
  actions: {
    uploadVideo ({ commit }, payload) {
      const file = payload.file
      const alt = payload.alt
      const storageRef = storage.ref('videos/' + file.name)
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
            videoCollection
              .add({
                name: file.name,
                createdOn: new Date(),
                url: downloadURL,
                alt: alt,
              })
              .then(doc => {
                const id = doc.id
                videoCollection
                  .doc(id)
                  .get()
                  .then(doc => {
                    const img = doc.data()
                    img.id = id
                    commit('setVideo', img)
                  })
                  .then(() => {
                    store.dispatch('global/setLoading', false)
                    const msg = {
                      type: 'success',
                      message: 'video sucssesfully uploaded to storage',
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
        const storageRef = storage.ref('videos/' + file.name)
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
              videoCollection
                .add({
                  name: file.name,
                  createdOn: new Date(),
                  url: downloadURL,
                  alt: alt,
                })
                .then(doc => {
                  const id = doc.id
                  videoCollection
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
    setVideos ({ commit }) {
      videoCollection.orderBy('createdOn', 'desc').onSnapshot(querySnapshot => {
        const videosArray = []

        querySnapshot.forEach(doc => {
          const video = doc.data()
          video.id = doc.id
          videosArray.push(video)
        })
        commit('setVideos', videosArray)
      })
    },
  },
  getters: {
    getVideo (state) {
      return state.video
    },
    getVideos (state) {
      return state.videos
    },
    getMsg (state) {
      return state.msg
    },
  },
}

export default videos
