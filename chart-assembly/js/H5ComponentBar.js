var H5ComponentBar=function(a,e){var n=new H5ComponentBase(a,e);return $.each(e.data,function(a,e){var d=$('<div class="line"></div>'),s=$('<div class="name"></div>'),i=$('<div class="rate"></div>'),p=$('<div class="bg"></div>'),c=$('<div class="per"></div>'),v=100*e.per+"%";s.text(e.name),i.css("width",v).append(p),e.bgc&&p.css("backgroundColor",e.bgc),c.text(v),d.append(s).append(i).append(c),n.append(d)}),n};