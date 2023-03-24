const btn1=document.getElementsByClassName('btn1')[0]
const btn2=document.getElementsByClassName('btn2')[0]
const printListBox=document.getElementsByClassName('showList')[0]
let _printPrint={}
btn1.addEventListener('click',async function(){
   const printList= (await window.electronAPI.getPrintList()).map(item=>({name:item.name,isDefault:item.isDefault}))
   _printPrint=printList.find(item=>item.isDefault)
   printListBox.innerHTML=JSON.stringify(printList)
})
btn2.addEventListener('click',function(){
    console.log('render---handlePrint')
    window.electronAPI.handlePrint(_printPrint)

})