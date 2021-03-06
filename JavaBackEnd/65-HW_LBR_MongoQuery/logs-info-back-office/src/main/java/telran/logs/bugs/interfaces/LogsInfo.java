package telran.logs.bugs.interfaces;

import java.util.List;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import telran.logs.bugs.dto.ArtifactCount;
import telran.logs.bugs.dto.LogDto;
import telran.logs.bugs.dto.LogType;
import telran.logs.bugs.dto.LogTypeCount;

public interface LogsInfo {
Flux<LogDto> getAllLogs();
Flux<LogDto> getAllExceptions();
Flux<LogDto> getLogsType(LogType logType);
Flux<LogTypeCount> getLogTypeOccurrences();
Flux<LogType> getMostEncounteredExceptionTypes(int nExceptions);
Flux<ArtifactCount> getArtifactOccurrences();
Mono<List<String>> getMostEncounteredArtifacts(int nArtifacts);

}
