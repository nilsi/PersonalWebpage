package sample.ui.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import sample.ui.model.MapMark;
import sample.ui.model.MapMarkRepository;

import java.util.List;

@RestController
public class MapController {

    @Autowired
    MapMarkRepository repository;


    @RequestMapping(value = "/mark", method = RequestMethod.POST)
    public MapMark contact(@RequestParam(value = "message") String message, @RequestParam(value = "lat") double latitude, @RequestParam(value = "country") String country, @RequestParam(value = "long") double longitude) {
        MapMark mark = new MapMark(message, longitude, latitude, country);
        repository.save(mark);
        return mark;
    }

    @RequestMapping(value = "/marksbycountry", method = RequestMethod.GET)
    public List<MapMark> contact(@RequestParam(value = "country") String country) {
        return repository.findByCountryLikeOrderByDateDesc(country);
    }

    @RequestMapping(value = "/allmarks", method = RequestMethod.GET)
    public List<MapMark> findAll() {
        return repository.findAll();
    }

}
