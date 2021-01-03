package com.localizeus.core.service.mapper;


import com.localizeus.core.domain.*;
import com.localizeus.core.service.dto.TranslationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Translation} and its DTO {@link TranslationDTO}.
 */
@Mapper(componentModel = "spring", uses = {TranslationKeyMapper.class, LanguageMapper.class})
public interface TranslationMapper extends EntityMapper<TranslationDTO, Translation> {

    @Mapping(source = "refTranslationKey.id", target = "refTranslationKeyId")
    @Mapping(source = "refLanguage.id", target = "refLanguageId")
    TranslationDTO toDto(Translation translation);

    @Mapping(source = "refTranslationKeyId", target = "refTranslationKey")
    @Mapping(source = "refLanguageId", target = "refLanguage")
    Translation toEntity(TranslationDTO translationDTO);

    default Translation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Translation translation = new Translation();
        translation.setId(id);
        return translation;
    }
}
