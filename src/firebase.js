import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDoc,
  limit,
} from "firebase/firestore"

import { firebaseConfig as localConfig } from "./firebase-config" // ensure you copy example to actual file

let app
export function getFirebaseApp() {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(localConfig)
  }
  return app
}

export function getFirebaseAuth() {
  return getAuth(getFirebaseApp())
}

export function getDb() {
  return getFirestore(getFirebaseApp())
}

// Auth helpers
export async function signInWithGooglePopup() {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export async function signUpWithEmail(email, password, displayName) {
  const auth = getFirebaseAuth()
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(cred.user, { displayName })
  }
  return cred
}

export async function signInWithEmail(email, password) {
  const auth = getFirebaseAuth()
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOutUser() {
  const auth = getFirebaseAuth()
  return signOut(auth)
}

export function onUserChanged(callback) {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, callback)
}

// Firestore: resumes CRUD
// Collection: resumes, fields: userId, name, data (formData), template, updatedAt
export function listenResumes(userId, onChange) {
  const db = getDb()
  const q = query(
    collection(db, "resumes"),
    where("userId", "==", userId),
    orderBy("updatedAt", "desc"),
    limit(10) // Fetch only the latest 10 resumes
  )
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    onChange(items)
  })
}

export async function createResume(userId, payload) {
  const db = getDb()
  const col = collection(db, "resumes")
  const docRef = await addDoc(col, {
    userId,
    name: payload.name || "Untitled Resume",
    data: payload.data || {},
    template: payload.template || "classic",
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateResume(id, payload) {
  const db = getDb()
  const ref = doc(db, "resumes", id)
  await updateDoc(ref, { ...payload, updatedAt: serverTimestamp() })
}

export async function deleteResume(id) {
  const db = getDb()
  const ref = doc(db, "resumes", id)
  await deleteDoc(ref)
}

export async function getResume(id) {
  const db = getDb()
  const ref = doc(db, "resumes", id)
  const snap = await getDoc(ref)
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() }
  }
  return null
}
