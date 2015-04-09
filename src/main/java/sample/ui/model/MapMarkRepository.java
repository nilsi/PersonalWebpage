package sample.ui.model;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MapMarkRepository extends CrudRepository<MapMark, Long> {

    public List<MapMark> findByCountryLikeOrderByDateDesc(String country);

    public List<MapMark> findAll();
}
