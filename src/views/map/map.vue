<template>
  <div id="map">
    
  </div>
  <!-- <HelloWorld :msg="msg" /> -->
  <!-- <Apple /> -->
  <el-row :gutter="20" class="el_row">
    <el-button type="success" plain size="large" @click="loadMapType">加载MapType</el-button>
    <el-button type="success" plain size="large" @click="initMap">创建地图</el-button>
    <el-button type="warning" plain size="large" @click="destroyMap">销毁地图</el-button>
  </el-row>
  <el-row :gutter="20" class="el_row el_row1">
    <el-input class="put" v-model="toAddress" placeholder="" size="normal" clearable></el-input>
    <el-button type="success" plain size="large" @click="gotoCity">去指定城市</el-button>
  </el-row>
</template>

<script setup>
  // import HelloWorld from '@comp/HelloWorld.vue'
  // import Apple from '@comp/Apple.vue'
  import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue'
  import AMapLoader from '@amap/amap-jsapi-loader'
  window._AMapSecurityConfig = {
    securityJsCode: '397512977dc3664949dd96d9ed8b768e'
  }

  const toAddress = ref('北京市')

  let map = shallowRef(null)
  let loca = shallowRef(null)
  function initMap() {
    AMapLoader.load({
      key: 'e5c550c7d1878b8bb6fd63643d645a1c',
      version: '2.0',
      // plugins: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
      Loca: {                // 是否加载 Loca， 缺省不加载
        "version": '2.0.0'  // Loca 版本，缺省 1.3.2
      }
    })
    .then( AMap => {
      map = new AMap.Map('map',{
        zoom: 12,
        center: [104.065722, 30.657511],
        viewMode: '2D', //查看视野
        // showIndoorMap: false //关闭室内地图
        // resizeEnable: true, //是否监控地图容器尺寸变化
      })

      map.addControl(new AMap.Scale())
      map.addControl(new AMap.ToolBar())

      map.on('click', clickMap) // 地图绑定点击事件
      // dblclick 双击事件 mousemove 鼠标滑动

      mapMoveEvent()

      map.on( 'complete', mapComplete)

      loca = new Loca.Container({ map })
    })
    .catch( err => console.log(err) )
  }

  const mapMoveEvent = () => {
    map.on('movestart', () => {
      const zoom = map.getZoom() // 缩放级别
      const center = map.getCenter() // 地图中心
      const { lng, lat } = center
      console.log('地图开始移动:', zoom, lng, lat)
    })
    map.on('mapmove', e => {
      console.log('map moveing', e.target.getCenter().lng)
    })
    map.on('moveend', e => {
      const zoom = e.target.getZoom() // 缩放级别
      console.log('map moveend', zoom)
      // if ( zoom < 20 ) map.setZoom( zoom + 1 )
    })
  }

  const clickMap = e => {
    let { lnglat } = e
    let [lng, lat] = [ lnglat.getLng(), lnglat.getLat() ]
    console.log( '拾取到的经纬度:', lng, lat )

    map.getCity( info => {
      console.log( '地图中心的行政区', JSON.stringify(info))
    })
  }

  const gotoCity = () => {
    // toAddress 的值可以是 cityname、adcode、citycode
    if ( !toAddress.value ) return tips('warning', 'cityname、adcode、citycode')
    map.setCity(toAddress.value)
  }

  const mapComplete = () => {
    const mapCenter = map.getCenter()
    console.log( 'Map Ready.. Map center is:', mapCenter.lng, mapCenter.lat )
  }

  const loadMapType = () => {
    AMapLoader.load({ //可多次调用load
      plugins:['AMap.MapType']
    }).then( AMap => {
      map.addControl(new AMap.MapType())
      console.log('mapType 加载成功')
    }).catch( e => {
      console.error(e)
    })
  }

  const destroyMap = () => {
    map && map.destroy()
    console.log('地图已销毁')
  }

  const tips = (type, message) => {
    ElMessage({
      type,
      message
    })
  }

  onMounted( () => {
    initMap()
  })

  onBeforeUnmount( () => {  // 卸载前
    map.off('click', clickMap)  // 解除事件绑定
    map.off('complete', mapComplete)
    map.off('movestart')
    map.off('mapmove')
    map.off('moveend')

    // 缩放事件-和move差不多
    // map.on('zoomstart', fun)
    // map.on('zoomchange', fun)
    // map.on('zoomend', fun)

    // 拖动地图事件 - 和上面一个套路
    // map.on('dragstart', fun)
    // map.on('dragging', fun)
    // map.on('dragend', fun)

    // 设置地图中心/缩放级别
    // map.setCenter([lng, lat])
    // map.setZoom(Number)
    // map.setZoomAndCenter(Number, [lng, lat])

    console.log('页面卸载.')
  })

</script>

<style lang='scss' scoped>
  #map{
    width: 100%;
    height: inherit;
    position: absolute;
  }
  .el_row{
    position: absolute;
    bottom: 0;right: 150px;
    margin-left: unset!important;
    margin-right: unset!important;
  }
  .el_row1{
    bottom: 60px;
    .put {
      width: 150px;
    }
  }
</style>